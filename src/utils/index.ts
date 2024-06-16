function splitFirstLine(text: string) {
    // Split the text into lines
    const lines = text.split("\n");
  
    // Take the first line
    const firstLine = lines[0];
  
    // Join the remaining lines back together
    const restOfText = lines.slice(1).join("\n");
  
    return { firstLine, restOfText };
  }

  export {splitFirstLine}