import React,{useState} from "react";
import styled from "styled-components";
import { Search,NotificationsOutlined,KeyboardArrowDownOutlined } from "@material-ui/icons";
import {Link} from 'react-router-dom';

const Wrapper = styled.div`
display:flex;
height:60px;
align-items:center;
justify-content:space-between`

const SearchContainer = styled.div`
    border: 0.5px solid grey;
    border-radius:6px;
    align-items:center;
    justify-content:flex-end;
    display:flex;
    height:40px;
    flex:1.5;
    margin-left:20px`

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

const Navlink = styled.div`
    flex:1;
    width:40%;
    display:flex;
    color:#00308f;
    align-items:center;
    justify-content:flex-end;
    margin-left:200px
    `
const Image = styled.img`
    height:60px;
    width:60px;
    border-radius:50%;
    margin-right:6px;
    `
export const DropDownContainer = styled.div`
    display:flex;
    flex-direction:column;
    width: 100%;
    justify-content:center;
    align-items:right;
    padding-left:20px;
    
    `
    
export const DropDownHeader = styled.div`
    justify-content:center;
    align-items:center;
    
    margin-bottom: 0.8em;
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
    
    `

const NavBar =(props)=>{
    const [toggle,setToggle] = useState(false)
    

    const handleDropDown = ()=>{
        setToggle(!toggle)
    }

    return(

        <Wrapper>
            <SearchContainer>
                <Input placeholder="search for anything" value={props.searchValue}  onChange={props.HandleInputChange}  /> 
                <SearchIcon>
                    <Search style={{ fontSize:'20px',color:'white',margin:'10px 20px'}} /> 
                </SearchIcon>
            </SearchContainer>
            <Navlink>
                <Link to='/' style={{marginRight:'25px'}}>Docs</Link>
                <NotificationsOutlined  style={{height:40,width:40,marginRight:'6px' }}/>
                <Image  src='/static/icons/my_selfie.jpg' style={{marginRight:'6px'}} />
            </Navlink>
            <DropDownContainer style={{width:'20%',position:'relative'}} >
                <DropDownHeader style={{cursor:'pointer'}} >Shawen<span> <KeyboardArrowDownOutlined  onClick={handleDropDown } /> </span>  </DropDownHeader>
                <DropDownListContainer style={{position:'absolute',marginTop:'80px'}} >
                    <DropDownList className={toggle? 'show-dropdown' : 'hide-dropdown'}>
                        <ListItem>account</ListItem>
                        <ListItem>logout</ListItem>
                    </DropDownList>
                </DropDownListContainer>
            </DropDownContainer>
        </Wrapper>

    )
}

export default NavBar;