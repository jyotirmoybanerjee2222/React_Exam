import React,{useState,useEffect} from 'react'
import axios from "axios"
import DataTable from 'react-data-table-component'
const Task = () => {
    const [task,setTask] = useState([]);
    const [selectedtask,setSelectedtask] = useState([]);
    //const [tittleDescList,settittleDescList] = useState([]);
    const [fromDate,setFromDate] = useState("")
    const [toDate,setToDate]=useState("")
    const  getAllTAsk = async() =>  {
    try{
       const response = await axios.get("https://faketasksapi.onrender.com/tasks");
        setTask(response?.data);
        setSelectedtask(response?.data);
        // console.log(response?.data);

    }catch(error){
      console.log(error);
    }
    }

    // console.log(selectedtask);

    useEffect(()=>{
        getAllTAsk();
        // setVal();
    },[]);



  const columns  =[
        {
            name:"id",
            selector:(row)=>row.id,
            sortable:true
        },
        {
            name:"task_tittle",
            selector:(row)=>row.task_title,
            sortable:true
        },
        {
            name:"task_desc",
            selector:(row)=>row.task_desc,
            sortable:true
        },
        {
            name:"created",
            selector:(row)=>row.created,
            sortable:true
        }
    ]

    const SearchTitleDescription= (e) =>{
        let val = e.target?.value;
        console.log(val)
        if(val.length>3){
            let selectTitleDesc = task.filter((tObj)=>(tObj.task_title.toLowerCase().includes(val.toLowerCase())
             || tObj.task_desc.toLowerCase().includes(val.toLowerCase())));
            setSelectedtask(selectTitleDesc);
        }
        else{
            setSelectedtask(task);
        }
    }
       
    // const setVal = ()=> {
    //     if(selectedtask.length != 0){
    //         settittleDescList(selectedtask);
    //     }
    //     else{
    //         settittleDescList(task);
    //     }
    // }

    const parseTaskDate = (dateStr) =>{
        const [day,month,year] = dateStr.split("-");
        return new Date(`${year}-${month}-${day}`);
    }

    const handleDate =()=>{

        if(!fromDate || !toDate){
            setSelectedtask(task);
            return;
        }

        const startDate = new Date(fromDate)
        const endDate = new Date(toDate)
       const filterDate = task.filter((tObj)=>{
        const taskDate =  parseTaskDate(tObj.created)
        return (taskDate>= startDate && taskDate<=endDate)});
       setSelectedtask(filterDate);
    }

    useEffect(()=>{
        handleDate();
    },[fromDate,toDate,task])



    
    
    
    
  return (
    <div>
        <div className="row">
            <div className="col">
                <label>From Date</label>
                <input type="date" className="date" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} />
            </div>
            <div className="col">
                <label >To Date</label>
                <input type="date" className="date" value={toDate} onChange={(e)=>setToDate(e.target.value)} />
            </div>
        </div>

        <header>Show All Task</header> 
        <div className="row">
            <div className="col">
                <input type="text" placeholder='Serach Tittle or description' onChange={SearchTitleDescription} />

            </div>
            <div className="col"></div>
        </div>
        <DataTable
            columns={columns}
            //data={tittleDescList}
            data={selectedtask}
            highlightOnHover
            striped
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5,10,20,50]}
        />              
    </div>

  )
}

export default Task
