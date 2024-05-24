const { DOMParser: XmlDomParser } = require('xmldom');

interface XmlNode {
    name: string;
    attributes: { [key: string]: string };
    children: XmlNode[];
    content: string;
}

class XmlParser {
    static parse(xml: string): XmlNode {
        const parser = new XmlDomParser();
        const xmlDoc = parser.parseFromString(xml, "text/xml");
        return this.parseNode(xmlDoc.documentElement);
    }

    private static parseNode(node: Element): XmlNode {
        const result: XmlNode = {
            name: node.nodeName,
            attributes: {},
            children: [],
            content: ""
        };

        for (let i = 0; i < node.attributes.length; i++) {
            const attribute = node.attributes[i];
            result.attributes[attribute.nodeName] = attribute.nodeValue || "";
        }

        for (let i = 0; i < node.childNodes.length; i++) {
            const childNode = node.childNodes[i] as Element;
            if (childNode.nodeType === 1) { // Check if nodeType is 1 (Element)
                result.children.push(this.parseNode(childNode));
            } else if (childNode.nodeType === 3) { // Check if nodeType is 3 (Text)
                result.content += childNode.textContent?.trim() || "";
            }
        }

        return result;
    }

    static print(node: XmlNode, indent: string = "") {
        console.log(indent + node.name + ": " + (node.content || ""));
        if (Object.keys(node.attributes).length > 0) {
            console.log(indent + "  Attributes:", node.attributes);
        }
        node.children.forEach(child => {
            this.print(child, indent + "  ");
        });
    }
    
}

const xmlInput = `
<ECUData>
    <ECU id="1">
        <Name>Engine Control Unit</Name>
        <Temperature>85</Temperature>
        <FuelLevel>2</FuelLevel>
    </ECU>
    <ECU id="2">
        <Name>Transmission Control Unit</Name>
        <Temperature>70</Temperature>
        <OilPressure>40</OilPressure>
    </ECU>
</ECUData>
`;

const parsedXml = XmlParser.parse(xmlInput);

XmlParser.print(parsedXml);

