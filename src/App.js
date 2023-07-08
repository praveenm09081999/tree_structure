import './App.css';
import { Tree, TreeNode } from 'react-organizational-chart'
import { useEffect, useState } from 'react';



function App() {
  const [branchObj,setBranchObj] = useState([])
  const [addPopup,setaddPopup] = useState(false)
  const [selectedBranch,setSelectedBranch] = useState(null)
  useEffect(()=>{
    let ArrBranch = ["Bor Burison",["Odin",["Thor","Thrud",["Thorson","ThorGrandson"]],"Loki","Hema"],"Curl","Vili"]
    setBranchObj([...branchObj,...ArrBranch])
  },[])
  

  const structureRoot = (rootArr) => {
  let rootHtml =<></>
  for(let i=1;i<rootArr.length;i++){
   rootHtml = <>{rootHtml} {structureTree(rootArr[i],"branch-"+i)}</>
  }
  return rootHtml
  }


  const deleteTreeStructure = (selectedBranch)=> {
    let numArr = selectedBranch.split("-").map(e => parseInt(e)).filter(e => e || e===0)
    let objArr = branchObj
    for(let i=0;i<numArr.length;i++){
      if(i === numArr.length-3 && numArr[i+2] === 0){
        if(numArr[i]+1 < objArr[numArr[i]].length){
          objArr[numArr[i]] = objArr[numArr[i]].slice(0,numArr[i+1])
          .concat( objArr[numArr[i]].slice(numArr[i+1]+1,objArr[numArr[i]].length))
        }else{
          objArr[numArr[i]] = objArr[numArr[i]].slice(0,numArr[i+1])
        }
        return null
      }else if (i === numArr.length-2 && numArr[i+1] && numArr[i+1] !== 0){
        if(objArr[numArr[i]]){
        objArr[numArr[i]] = objArr[numArr[i]].length === 2 
        ? objArr[numArr[i]].slice(0,numArr[i+1]).join("") 
        : objArr[numArr[i]].slice(0,numArr[i+1])
        .concat( objArr[numArr[i]].slice(numArr[i+1]+1,objArr[numArr[i]].length))
      }
      } else {
      objArr = objArr[numArr[i]]
      }
    }
  }


  const structureTree = (currArr,currBranch) => {
    let leafHtml = <></>
    let html = <></>
    if(typeof (currArr) == "string"){
      leafHtml = <TreeNode label={<div id={currBranch}>{currArr}</div>}></TreeNode>
      html = leafHtml
    } else {
      for(let i=1;i<currArr.length;i++){
        leafHtml = <>{leafHtml} {structureLeaves(currArr[i],currBranch+"-"+i)} </>
      }
      html = <TreeNode label={<div id={currBranch + "-0"}>{currArr[0]}</div>}> {leafHtml} </TreeNode>
    }
    return html
  }


  const structureLeaves = (arr,branch) => {
    let leafHtml = <></>
    let html = <></>
    if(typeof arr == "string"){
      leafHtml = <TreeNode label={
      <div id={branch}><div onClick={e => {
        deleteTreeStructure(branch)
        setBranchObj([...branchObj])
        }}>x</div>
      {arr}
      <div onClick={e => {
        setaddPopup(!addPopup)
        setSelectedBranch(branch)
        }}>+</div></div>}></TreeNode>
      html = leafHtml
    }
    else{
      for(let i=1;i<arr.length;i++){
        leafHtml = <>{leafHtml} {structureLeaves(arr[i],branch+"-"+i)} </>
      }
      html = <TreeNode label={<div id={branch + "-0"}>
        <div onClick={e => {
        deleteTreeStructure(branch + "-0")
        setBranchObj([...branchObj])
        }}>x</div>
        {arr[0]}
      <div onClick={e => {
        setaddPopup(!addPopup)
        setSelectedBranch(branch+"-0")
        }}>+</div></div>}> 
      {leafHtml} </TreeNode>
    }
    return html
  }
  

  return (
    <div className="App">
    {addPopup && <>
    <div id="add-branch">
      <input id="branch-Input"/>
      <button onClick={e => {
        let numArr = selectedBranch.split("-").map(e => parseInt(e)).filter(e => e || e===0)
        let objArr = branchObj
        for(let i=0;i<numArr.length;i++){
          if(i === numArr.length-1 && numArr[i] === 0){
            objArr.push(document.getElementById("branch-Input").value)
            setBranchObj([...branchObj])
          }else if (i === numArr.length-1 && numArr[i] !== 0){
            objArr[numArr[i]] = [objArr[numArr[i]]]
            objArr[numArr[i]].push(document.getElementById("branch-Input").value)
            setBranchObj([...branchObj])
          } else {
          objArr = objArr[numArr[i]]
          }
        }
        }}>Set</button>
    </div>
    </>}
    <Tree label={branchObj[0]}>
      {structureRoot(branchObj)}
    </Tree>
    </div>
  );
}

export default App;
