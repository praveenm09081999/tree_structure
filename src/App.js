import "./App.css";
import { Tree, TreeNode } from "react-organizational-chart";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const AddIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);

function App() {
  const [branchObj, setBranchObj] = useState([]);
  const [addPopup, setaddPopup] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  useEffect(() => {
    let ArrBranch = [
      "Bor Burison",
      ["Odin", ["Thor", "Thrud", ["Thorson", "ThorGrandson"]], "Loki", "Hema"],
      "Curl",
      "Vili",
    ];
    setBranchObj([...ArrBranch]);
  }, []);

  const structureRoot = (rootArr) => {
    let rootHtml = rootArr.length > 1 ? <></> : "";
    for (let i = 1; i < rootArr.length; i++) {
      rootHtml = (
        <>
          {rootHtml} {structureTree(rootArr[i], "branch-" + i)}
        </>
      );
    }
    return rootHtml;
  };

  const deleteTreeStructure = (selectedBranch) => {
    let numArr = selectedBranch
      .split("-")
      .map((e) => parseInt(e))
      .filter((e) => e || e === 0);
    let objArr = branchObj;
    if (numArr.length == 1) {
      objArr.splice(numArr[0], 1);
    } else {
      for (let i = 0; i < numArr.length; i++) {
        if (i === numArr.length - 3 && numArr[i + 2] === 0) {
          if (numArr[i] + 1 < objArr[numArr[i]].length) {
            objArr[numArr[i]] = objArr[numArr[i]]
              .slice(0, numArr[i + 1])
              .concat(
                objArr[numArr[i]].slice(
                  numArr[i + 1] + 1,
                  objArr[numArr[i]].length
                )
              );
          } else {
            objArr[numArr[i]] = objArr[numArr[i]].slice(0, numArr[i + 1]);
          }
          return null;
        } else if (
          i === numArr.length - 2 &&
          numArr[i + 1] &&
          numArr[i + 1] !== 0
        ) {
          if (objArr[numArr[i]]) {
            objArr[numArr[i]] =
              objArr[numArr[i]].length === 2
                ? objArr[numArr[i]].slice(0, numArr[i + 1]).join("")
                : objArr[numArr[i]]
                    .slice(0, numArr[i + 1])
                    .concat(
                      objArr[numArr[i]].slice(
                        numArr[i + 1] + 1,
                        objArr[numArr[i]].length
                      )
                    );
          }
        } else {
          objArr = objArr[numArr[i]];
        }
      }
    }
  };

  const structureTree = (currArr, currBranch) => {
    let leafHtml = <></>;
    let html = <></>;
    if (typeof currArr == "string") {
      leafHtml = (
        <TreeNode
          label={
            <div id={currBranch} className={"leafNode"}>
              <div
                onClick={(e) => {
                  deleteTreeStructure(currBranch);
                  setBranchObj([...branchObj]);
                }}
              >
                <DeleteIcon />
              </div>
              {currArr}
              <div
                onClick={(e) => {
                  setaddPopup(!addPopup);
                  setSelectedBranch(currBranch);
                }}
              >
                <AddIcon />
              </div>
            </div>
          }
        ></TreeNode>
      );
      html = leafHtml;
    } else {
      for (let i = 1; i < currArr.length; i++) {
        leafHtml = (
          <>
            {leafHtml} {structureLeaves(currArr[i], currBranch + "-" + i)}{" "}
          </>
        );
      }
      html = (
        <TreeNode
          label={
            <div id={currBranch + "-0"} className={"branchNode"}>
              <div
                onClick={(e) => {
                  deleteTreeStructure(currBranch);
                  setBranchObj([...branchObj]);
                }}
              >
                <DeleteIcon />
              </div>
              {currArr[0]}
              <div
                onClick={(e) => {
                  setaddPopup(!addPopup);
                  setSelectedBranch(currBranch + "-0");
                }}
              >
                <AddIcon />
              </div>
            </div>
          }
        >
          {leafHtml}{" "}
        </TreeNode>
      );
    }
    return html;
  };

  const structureLeaves = (arr, branch) => {
    let leafHtml = <></>;
    let html = <></>;
    if (typeof arr == "string") {
      leafHtml = (
        <TreeNode
          label={
            <div id={branch} className={"leafNode"}>
              <div
                onClick={(e) => {
                  deleteTreeStructure(branch);
                  setBranchObj([...branchObj]);
                }}
              >
                <DeleteIcon />
              </div>
              {arr}
              <div
                onClick={(e) => {
                  setaddPopup(!addPopup);
                  setSelectedBranch(branch);
                }}
              >
                <AddIcon />
              </div>
            </div>
          }
        ></TreeNode>
      );
      html = leafHtml;
    } else {
      for (let i = 1; i < arr.length; i++) {
        leafHtml = (
          <>
            {leafHtml} {structureLeaves(arr[i], branch + "-" + i)}{" "}
          </>
        );
      }
      html = (
        <TreeNode
          label={
            <div id={branch + "-0"} className={"branchNode"}>
              <div
                onClick={(e) => {
                  deleteTreeStructure(branch);
                  setBranchObj([...branchObj]);
                }}
              >
                <DeleteIcon />
              </div>
              {arr[0]}
              <div
                onClick={(e) => {
                  setaddPopup(!addPopup);
                  setSelectedBranch(branch + "-0");
                }}
              >
                <AddIcon />
              </div>
            </div>
          }
        >
          {leafHtml}{" "}
        </TreeNode>
      );
    }
    return html;
  };

  return (
    <div className="App">
      {addPopup && (
        <>
          <div id="add-branch" className="add-popup">
            <div
              className="popup-layer"
              onClick={(e) => {
                setaddPopup(false);
              }}
            ></div>
            <div className="add-popup-menu">
              <div className="popup-inputbox">
                <TextField
                  id="branch-Input"
                  label="Name of the child node"
                  variant="outlined"
                  className="popup-input"
                />
              </div>
              <div className="popup-ok">
                <div>
                  <Button
                    onClick={(e) => {
                      let numArr = selectedBranch
                        .split("-")
                        .map((e) => parseInt(e))
                        .filter((e) => e || e === 0);
                      let objArr = branchObj;
                      setaddPopup(false);
                      for (let i = 0; i < numArr.length; i++) {
                        if (i === numArr.length - 1 && numArr[i] === 0) {
                          objArr.push(
                            document.getElementById("branch-Input").value
                          );
                          setBranchObj([...branchObj]);
                        } else if (i === numArr.length - 1 && numArr[i] !== 0) {
                          objArr[numArr[i]] = [objArr[numArr[i]]];
                          objArr[numArr[i]].push(
                            document.getElementById("branch-Input").value
                          );
                          setBranchObj([...branchObj]);
                        } else {
                          objArr = objArr[numArr[i]];
                        }
                      }
                    }}
                    variant="contained"
                    color="success"
                    class="button-17"
                    role="button"
                  >
                    Ok
                  </Button>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={(e) => {
                      setaddPopup(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Tree label={<div className="rootNode"> {branchObj[0]} </div>}>
        {structureRoot(branchObj)}
      </Tree>
    </div>
  );
}

export default App;
