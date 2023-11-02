import { useState } from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"
import "../src/style.css"

const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Walmart",
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
      { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
    ],
    tint: 1,
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Indigo",
    items: [
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "Designing Data Intensive Applications",
      },
      { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "Atomic Habits" },
    ],
    tint: 2,
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "Lowes",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Workbench" },
      { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "Hammer" },
    ],
    tint: 3,
  },
];


function App() {
  const [stores, setStores] = useState(DATA)


  function handleDragend(result){
    const {source, destination, type} = result;
console.log(source, destination)
    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index === source.index) return;
    
   if(type === 'group'){
    const reOrderStores = [...stores]
    const destinationIndex = destination.index;
    const sourceIndex = source.index;
    const [deleteditem] = reOrderStores.splice(sourceIndex, 1)
    reOrderStores.splice(destinationIndex, 0, deleteditem)
    return setStores(reOrderStores)
   }
  }
  return (
    <DragDropContext onDragEnd={handleDragend}>
    <div className="App">
      
      <div className="layout__wrapper">
      <div className="card">
      
          <div className="header">
            <h1>Shopping List</h1>
            </div>
<Droppable droppableId="ROOT" type="group">
            {(provided)=>(
              <div {...provided.droppableProps} ref={provided.innerRef}>
              {stores.map((store, index) => (
                  
             <Draggable  
             draggableId={store.id}
             index={index}
             key={store.id}
             >
              {(provided)=>(
                <div className="store-container" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                <StoreList {...store} />
              </div>
              
              )}
             </Draggable>
              ))}
             {provided.placeholder}
            </div>
            )}
              </Droppable>
             
          </div>
          </div>
         
    </div>
    </DragDropContext>
  );
}

function StoreList({name, items, id}){
  return (
  <div>
    <h3 style={{backgroundColor: "green", padding: "4px", color: "white"}}>{name}</h3>
    <Droppable droppableId={id}>
    
        {(provided)=>(
          items.map((item, index)=>(
            <div {...provided.droppableProps} ref={provided.innerRef} className="item-container">
<Draggable draggableId={item.id} index={index} key={item.id}>
  {(provided)=>(    <div className="store-container" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} >
    <h3>{item.name}</h3>
    </div>
  )}
</Draggable>
{provided.placeholder}
</div>
          ))
        )}
    </Droppable>
  </div>
  )
}
export default App;
