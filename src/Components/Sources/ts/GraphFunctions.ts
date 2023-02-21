import * as iden from '../../Sources/js/dom-identifiers';
import * as d from '../../Sources/ts/GraphData';



import $ from "jquery";

let nameInputArray: any = [];
  let nameFromUser: any;
  let filtered: boolean;
  
  


export function hideNewElementContextMenu() {
    $("#" + iden.dom_itemdifier_ctxMenu)
      .removeClass("show")
      .addClass("hide");
  }
  
export function showNewElementContextMenu() {
    $("#" + iden.dom_itemdifier_ctxMenu)
      .removeClass("hide")
      .addClass("show");
  }

export function contextMapping (contextMenuX:any,contextMenuY:any,graph:any){
  let contextMenuClickMapping = new Map([
    [iden.dom_itemdifier_rectTrigger, d.addRectangle],
    [iden.dom_itemdifier_cicleTrigger, d.addCircle],
    [iden.dom_itemdifier_closeTrigger, undefined],
  ]);
  contextMenuClickMapping.forEach((value, key) => {
    $("#" + key).click(function () {
      if (value !== undefined) {
      value.apply(null, [contextMenuX, contextMenuY, graph]);
      }
      hideNewElementContextMenu();
    });

    hideNewElementContextMenu();
  });
  
};

export function linkCreationStart(cellView: any,linkCreationMode:any,sourceCell:any) {
    sourceCell = cellView.model;
    const colorMarked ="#ff8800";
    cellView.model.attr("body/stroke", colorMarked);
    return sourceCell;
  }

export function linkCreationEnd(linkCreationMode:any,targetCell:any,cellView:any,graph:any,sourceCell:any,toggleDir:any){
  if (linkCreationMode === "start") {
        targetCell = cellView.model;
        d.addLink(sourceCell, targetCell, graph);
        linkCreationMode = 'nill'
      }
      return linkCreationMode; 
}

export function giveName (cellView:any,inputName:any) {
  // const name = cellView.model.attr().label.text;
  nameFromUser = inputName;
  if (nameFromUser !== "") {
   
    nameInputArray.push(nameFromUser);
    console.log("values inside the array -", nameInputArray);
    return cellView.model.attr("label/text", nameFromUser);
  }
}

export function alreadyNameExists(inputName:any){
  nameFromUser = inputName;
  console.log('Name inside Already ExistsFunction - ',nameFromUser);
  filtered = nameInputArray.includes(nameFromUser);
  console.log('Check inside alreadyExistsFunction - ',filtered)

  if (filtered.toString() === "true") {
    return true;
    }
    else{
      return false;
    }

}

export function onClearGraphCall(){
  nameInputArray=[];
  console.log('Array value - ',nameInputArray)
}
