import * as joint from "jointjs";
import "popper.js";

export const getCircle = () => {
  let shapeCircle = new joint.shapes.standard.Circle();

  return shapeCircle;
};
export const getLink = (toggleDir:any) => {
  
  if(toggleDir === "true"){
    console.log("the link Direction Inside True block - ",toggleDir);
    
    let shapeLink = new joint.shapes.standard.Link();
    return shapeLink;
  }else{
    // Undirected Links -- Starts
  let shapeLink = new joint.shapes.standard.Link({
    attrs: { 
      line: { 
          width: 1,
          targetMarker: {
              type: 'circle',
              size: 5,
              attrs: {
                  fill: 'black'
              }
          }
      }
  }
  });
  return shapeLink;
  // Undirected Links -- Ends
}
  // let shapeLink = new joint.dia.Link({
  //   attrs:{
  //     '.marker-target': {
  //       d: 'M 10 0 L 0 5 L 10 10 z',
  //       fill: '#34495E'
  //     }
  //   }
  // });
};
export const getRect = () => {
  let shapeRect = new joint.shapes.standard.Rectangle();

  return shapeRect;
};

export const addCircle = (x: number, y: number, graph: any) => {
  let circle = getCircle();
  circle.position(x, y);
  circle.resize(100, 40);
  circle.attr("label/text", "cir");
  circle.addTo(graph);
  return circle;
};

export function addLink(source: any, target: any, graph: any) {
  let linkDirection:any = localStorage.getItem("LinkDirection");
  let link = getLink(linkDirection);
  link.source(source);
  link.target(target);
  if(linkDirection==="true"){
  link.appendLabel({
    attrs: {
       text: {
            text: 'Directed'
        }
    }
});
  }
  else{
    link.appendLabel({
      attrs: {
         text: {
              text: 'Undirected'
          }
      }
  });
  }
link.addTo(graph);
  return link;
}
export function addRectangle(x: number, y: number, graph: any) {
  let rect = getRect();
  rect.position(x, y);
  rect.resize(100, 40);
  rect.attr("label/text", "rect");
  rect.addTo(graph);
  return rect;
}
