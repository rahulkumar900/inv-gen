import * as components from "./index";

// Dynamically map component names to the actual components
const componentsMap: Record<string, React.ComponentType<any>> = {};

// Populate the map
Object.keys(components).forEach((key) => {
  componentsMap[key] = (components as any)[key];
});

// console.log(componentsMap);

export default componentsMap;
