//import test from "./test";

class DependencyChecker {
  constructor(json) {
    this.dependecyTree = json;
    console.log(json);
  }
  findAllInstancesOfDep(dep) {
    this.instances = [];
    let depth = 0;
    let parent = null;
    const recurse = (tree, depth) => {
      if (typeof depth == "number") depth += 1;
      else depth = 1;
      for (const [key, value] of Object.entries(tree)) {
        if (packages.indexOf(key) === -1) {
          packages.push(key);
        }
        if (depth === 1) {
          parent = key;
        }
        if (key === dep) {
          this.instances.push({
            name: key,
            version: value.version,
            parent
          });
        }
        if (tree[key] && tree[key].dependencies) {
          recurse(tree[key].dependencies, depth);
        }
      }
    };
    recurse(this.dependecyTree.dependencies);
    return this.instances;
  }
}

const depCheck = new DependencyChecker(test);
depCheck.findAllInstancesOfDep();

const submitPackage = input => {
  var nameValue = document.getElementById("myInput").value;
  const deps = depCheck.findAllInstancesOfDep(nameValue);
  document.getElementById("list").innerHTML = "";
  for (dep of deps) {
    var node = document.createElement("LI"); // Create a <li> node
    var textnode = document.createTextNode(
      `${dep.name} | ${dep.version} | ${dep.parent}`
    ); // Create a text node
    node.appendChild(textnode); // Append the text to <li>
    document.getElementById("list").appendChild(node);
  }
  console.log(deps);
};
