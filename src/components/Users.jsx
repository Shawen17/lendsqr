import React,{useState,useMemo} from 'react';
import {Table} from 'reactstrap';
import {MoreVertOutlined,FilterListOutlined} from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import FilterForm from './FilterForm';
import Pagination from './Pagination';


let PageSize = 10;

const Users = (props) =>{
    var data = props.currentData

    const[menu,setMenu]=useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [clicked,setClicked] = useState(false)
    const [inputs,setInputs] = useState({})
    var [result,setResult]=useState(props.currentData)
    const navigate = useNavigate()
    
    
    const handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    var result1;

    const onFilter=()=>{
        
        const available = Object.keys(inputs)
        const keywords= []
        available.forEach(key=>{
            if(inputs[key]){
                keywords.push(key)}})

        
        if(keywords.length>0){
            
            if(keywords.length===1){
                setResult(data)
                result1=result.filter((user)=>{
                    return user[keywords[0]].toLowerCase().includes(inputs[keywords[0]].toLowerCase())
                })
                setResult(result1)
                
            }else if(keywords.length===2){
                result1=data.filter((user)=>{
                    return user[keywords[0]].toLowerCase().includes(inputs[keywords[0]].toLowerCase()) && user[keywords[1]].toLowerCase().includes(inputs[keywords[1]].toLowerCase())
                })
                setResult(result1)
                
            }else if(keywords.length===3){
                result1=data.filter((user)=>{
                    return (user[keywords[0]].toLowerCase().includes(inputs[keywords[0]].toLowerCase()) && user[keywords[1]].toLowerCase().includes(inputs[keywords[1]].toLowerCase()) 
                    && user[keywords[2]].toLowerCase().includes(inputs[keywords[2]].toLowerCase()) )
                })
                setResult(result1)
                
            }else if(keywords.length===4){
                result1=data.filter((user)=>{
                    return (user[keywords[0]].toLowerCase().includes(inputs[keywords[0]].toLowerCase()) && user[keywords[1]].toLowerCase().includes(inputs[keywords[1]].toLowerCase()) 
                    && user[keywords[2]].toLowerCase().includes(inputs[keywords[2]].toLowerCase()) && user[keywords[3]].toLowerCase().includes(inputs[keywords[3]].toLowerCase()) )
                })
                setResult(result1)
                
            }else if(keywords.length===5){
                result1=data.filter((user)=>{
                    return (user[keywords[0]].toLowerCase().includes(inputs[keywords[0]].toLowerCase()) && user[keywords[1]].toLowerCase().includes(inputs[keywords[1]].toLowerCase()) 
                    && user[keywords[2]].toLowerCase().includes(inputs[keywords[2]].toLowerCase()) && user[keywords[3]].toLowerCase().includes(inputs[keywords[3]].toLowerCase()) 
                    && user[keywords[4]].toLowerCase().includes(inputs[keywords[4]].toLowerCase()))
                })
                setResult(result1)
                
            }else if(keywords.length===6){
                result1=data.filter((user)=>{
                    return (user[keywords[0]].toLowerCase().includes(inputs[keywords[0]].toLowerCase()) && user[keywords[1]].toLowerCase().includes(inputs[keywords[1]].toLowerCase()) 
                    && user[keywords[2]].toLowerCase().includes(inputs[keywords[2]].toLowerCase()) && user[keywords[3]].toLowerCase().includes(inputs[keywords[3]].toLowerCase()) 
                    && user[keywords[4]].toLowerCase().includes(inputs[keywords[4]].toLowerCase()) && user[keywords[5]].toLowerCase().includes(inputs[keywords[5]].toLowerCase()))
                })
                setResult(result1)
            }

        }else{
            
            setResult(props.currentData)
        }
        
        
    }
        
    const onReset = ()=>{
        setInputs({})
        setResult(props.currentData)
    }

    const filterClick = ()=>{
        setClicked(!clicked)
        if(clicked){
            onReset()
        }
    }
    
    const  displayDetails=(id)=>{
        const Data=[...result]
        const user=Data.splice(id,1)
        localStorage.setItem('user',JSON.stringify(user))
        setMenu()
        navigate('/user-details')
        
    }

    const blacklistUser =(id,user)=>{
        props.decrement(user.status)
        data[id].status= 'Blacklisted'
        const userIndex = data.findIndex(obj=>{
            return obj.id===user.id
        })
        data[userIndex].status= 'Blacklisted'
        localStorage.setItem('data',JSON.stringify(data))
    }

    const activateUser =(id,user)=>{
        props.increment(user.status)
        data[id].status= 'Active'
        const userIndex = data.findIndex(obj=>{
            return obj.id===user.id
        })
        data[userIndex].status= 'Active'
        localStorage.setItem('data',JSON.stringify(data))
        
    }

    const displayMenu = (index) => {
        setMenu(index)
      }

    const customStatus = (status)=>{
        if(status==='Active'){
            return <span id="active-status">Active</span>
        }else if(status==='Inactive'){
            return <span id="inactive-status">Inactive</span>
        }else if(status==='Pending'){
             <span id="pending-status">Pending</span>
        }
        else{
            return <span id="blacklisted-status">Blacklisted</span>
        }
    }

    

    const formatDate = (str)=>{
        let date = new Date(str)
        return date.toDateString()
    }

    var currentData = useMemo(() => {
        if(!clicked){
            setResult(props.currentData)
        }
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return result.slice(firstPageIndex, lastPageIndex);
      }, [currentPage,result,clicked,props.currentData]); 

    
    return (
        <div style={{borderRadius:'6px',backgroundColor:'white'}} >
            {clicked? <FilterForm handleChange={handleChange} onFilter={onFilter} onReset={onReset} inputs={inputs} />: ''}
            
                <Table borderless style={{position:'relative'}}>
                    
                    <thead>
                    
                        <tr >
                            <th onClick={filterClick}>ORGANIZATION <FilterListOutlined /> </th>
                            <th  onClick={filterClick}>USERNAME <FilterListOutlined /></th>
                            <th onClick={filterClick}>EMAIL <FilterListOutlined /></th>
                            <th onClick={filterClick}>PHONE NUMBER <FilterListOutlined /></th>
                            <th onClick={filterClick}>DATE JOINED <FilterListOutlined /></th>
                            <th onClick={filterClick}>STATUS <FilterListOutlined /></th>
                            <th></th>
                        </tr>
                    </thead>
                    
                    <tbody>
                    
                        {currentData.map((user,index) => {
                        return(
                            
                            <tr key={index} style={{borderBottom:'1px solid #ccc',height:'60px',opacity:1,justifyContent:'center'}} >
                            
                                <td>{user.orgName}</td>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{formatDate(user.createdAt)}</td>
                                <td>{customStatus(user.status)}</td>
                                <td>
                                    <button onClick={()=>{displayMenu(index)}} style={{border:'none',backgroundColor:'white'}}>
                                    <MoreVertOutlined  className='menu-bar' />
                                    <ul className={menu===index ? 'show-menu-options': 'hide-menu-options'}>
                                        <li onClick={()=>{displayDetails(index)}} >View Details</li>
                                        <li onClick={()=> {blacklistUser(index,user)}}>Blacklist</li>
                                        <li onClick={()=> {activateUser(index,user)}}>Activate</li>
                                    </ul>
                                    
                                    </button>
                                </td>
                                
                            </tr>
                            )} 
                        )}
                    </tbody>
                </Table>      
                <div style={{marginLeft:'500px'}}>
                    <Pagination 
                        key={currentPage}
                        className="pagination mt-4"
                        currentPage={currentPage}
                        totalCount={data.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}/>
                </div>
            </div>
    )

}

    
export default Users;