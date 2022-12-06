import React,{useState} from "react";
import styled from "styled-components";
import { Search,NotificationsOutlined,KeyboardArrowDownOutlined,Menu } from "@material-ui/icons";
import {Link} from 'react-router-dom';




const Navlink = styled.div`
    
    display:flex;
    color:#00308f;
    align-items:center;
    justify-content:flex-start;
    margin-left:0px;
    width:30%
    `

const Wrapper = styled.div`
display:flex;
height:60px;
max-width:100%;
align-items:center;
justify-content:space-between;
@media screen and (min-width:0px) and (max-width:568px){
   max-width:100%;
   height:150px;
   position:relative;
   flex-direction:column-reverse;
   align-items:left;
   justify-content:flex-start;
   ${Navlink}{
    margin-left:20px;
   }
}`

const Input = styled.input`
    type: text;
    border:none;
    flex:9;
    border-style:none;
    &:focus {
      outline:none;
      border-color:none;
      border:none
    }
`

const SearchIcon = styled.div`
    height:100%;
    opacity:0.5;
    background-color:#00ffff;
    flex:2;
    align-items:center;
    justify-content:center;`



const SearchContainer = styled.div`
    border: 0.5px solid grey;
    border-radius:6px;
    align-items:center;
    justify-content:flex-end;
    display:flex;
    height:40px;
    width:50%;
    margin-left:0px;
    @media screen and (min-width:0px) and (max-width:568px){
        margin-left:0px;
        height:30px;
        width:100%;
        ${Input}{
            width:80%;
        }
        ${SearchIcon}{
            width:20%;
        }
        ${Navlink}{
            margin-left:0px;
            flex:0.5;
        }
    }`





const Image = styled.img`
    height:60px;
    width:60px;
    border-radius:50%;
    margin-right:6px;
    `
export const DropDownContainer = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    justify-content:center;
    align-items:center;
    
    
    `
    
export const DropDownHeader = styled.div`
    justify-content:center;
    align-items:center;
    
    font-weight:bold;
    font-family:Calibri;
    font-size:15px;
    color:#00308f;
    
    `
export const DropDownListContainer =styled.div``
    
export const DropDownList = styled.ul`
    padding:0;
    margin-top:10px;
    margin:0;
    padding-left:1em;
    border: 2px solid #e5e5e5;
    box-sizing:border-box;
    color:#00308f;
    font-size: 18px;
    font-weight:500px;
    list-style-type: none;
    &:first-child{
        padding-top:0.8em;
    }`
    
export const ListItem= styled.li`
    list-style:none;
    pointer:cursor;
    z-index:9
    
    `

const NavBar =(props)=>{
    const [toggle,setToggle] = useState(false)
    

    const handleDropDown = ()=>{
        setToggle(!toggle)
    }

    return(

        <Wrapper>
            <div  className="hamburger">
                <Menu onClick={props.onMenuClick} />
            </div>
            <SearchContainer>
                <Input placeholder="search for anything" value={props.searchValue}  onChange={props.HandleInputChange}  /> 
                <SearchIcon>
                    <Search id='search-icon' /> 
                </SearchIcon>
            </SearchContainer>
            <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
                <Navlink>
                    <Link to='/' style={{marginRight:'25px'}}>Docs</Link>
                    <NotificationsOutlined  style={{height:40,width:40,marginRight:'6px' }}/>
                    <Image  src='/static/icons/my_selfie.jpg'  />
                </Navlink>
                
                <DropDownContainer >
                <div  className='sidebar-link nav'  onClick={handleDropDown }>Shawen<span> <KeyboardArrowDownOutlined /> </span>  </div>
                    <DropDownListContainer style={{position:'absolute',marginTop:'80px'}} >
                        <DropDownList className={toggle? 'show-dropdown' : 'hide-dropdown'}>
                            <ListItem>account</ListItem>
                            <ListItem>logout</ListItem>
                        </DropDownList>
                    </DropDownListContainer>
                </DropDownContainer>
            </div>
        </Wrapper>

    )
}

export default NavBar;