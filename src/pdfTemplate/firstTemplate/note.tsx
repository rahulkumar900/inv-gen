import {View,Text} from "@react-pdf/renderer"

export default function Note() {
    return (
      <View style={{ paddingHorizontal: 14, paddingVertical: 28 }}>
        <Text>Note : </Text>
        <Text
          style={{
            fontFamily: "Helvetica",
            fontSize: 11,
            marginTop: 4,
            lineHeight: 1.2,
            textOverflow: "ellipsis",
          }}
        >
          Payment should be within 15 days of delivery,React-pdf is shipped with a
          Font module that enables to load fonts from different sources, handle
          how words are wrapped and defined an emoji source to embed these glyphs
          on your document.
        </Text>
      </View>
    );
  }