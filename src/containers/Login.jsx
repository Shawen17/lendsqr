import React,{useState} from 'react';
import styled from 'styled-components';
import { Link,useNavigate } from 'react-router-dom';

const Container = styled.div`
height:100%;
width:100%;
align-items:center;
justify-content:center;
right:20px;
left:20px
`

export const Brand = styled.div`
display:flex;
flex:0.5;
margin-bottom:30px;
line-height:36px;
align-items:center;
justify-content:left
`

export const BrandName = styled.h1`
color:#00308f ;
font-weight:bold;
align-items:center;
justify-content:center;`

export const BrandLogo = styled.div`
align-items:center;
justify-content:center;
`
const Item = styled.div`
padding-top:20px;
display:flex;
align-items:center;
justify-content:center;


`

const Right = styled.div`

width:50%;
align-items:center;
justify-content:center;
margin-left:auto;

`

const Left = styled.div`
width:50%;

`

const Form = styled.div`
display:flex;
flex-direction:column;
margin-top:10px;
width:100%;
`
const SearchContainer = styled.div`
    margin-top:14px;
    border: 3px solid #BBBBB4;
    border-radius:6px;
    align-items:center;
    justify-content:flex-start;
    display:flex;
    height:50px;
    width:80%;
    font-family: 'Avenir Next';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #545F7D;
    opacity: 0.6
`
const Input = styled.input`
      type: ${props=> props.type};
      margin-left:10px;
      border:none;
      width:80%;
      border-style:none;
      &:focus {
        outline:none;
        border-color:none;
        border:none
      }
`
const Art  = styled.img`
width:100%;
margin-top:20px;
justity-content:center`


const Desc= styled.span`
justify-content:center;
align-items:right;
display:flex;
font-family: 'Avenir Next';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 16px;
text-align: center;
letter-spacing: 0.1em;
text-transform: uppercase;
color: #39CDCC;
cursor:pointer
`





const Login = () => {
    const navigate = useNavigate()
    const [inputValues,setValues]=useState({})
    const [clicked,setClicked] = useState(false)

    const HandleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setValues(values => ({...values, [name]: value}))
    }

    const showPassword =()=>{
        setClicked(!clicked)
    }

    const HandleSubmit=e=>{
        e.preventDefault();
        navigate('/dashboard')
       
    };

  return (
    <Container>
        <Brand>
            <BrandLogo>
            <img src='/static/icons/lendsqr.jpg' alt='logo' style={{height:50,width:50}} />
            </BrandLogo>
            <BrandName>
                lendsqr
            </BrandName>
        </Brand>
        <Item>
            <Left>
                <Art src='/static/icons/lendsqrArt.png'  alt='art'/>
            </Left>
            <Right>
                <h1 style={{color:'#00308f',fontWeight:'bold'}}>Welcome! </h1>
                <p  style={{color:'#00308f',fontSize:'19px',paddingBottom:'50px'}}>Enter details to login</p>
                <Form  onSubmit={HandleSubmit}>
                    <SearchContainer>
                        <Input  placeholder ='Email' name='email' value={inputValues.email || ""} type='email' onChange={HandleChange} />
                    </SearchContainer>
                    <SearchContainer>
                        <Input  placeholder='Password' name='password' value={inputValues.password || ""} type={clicked?'text' : 'password'} onChange={HandleChange}/>
                        <Desc onClick={showPassword}>show</Desc>
                    </SearchContainer>
                    
                    <Link className='nav-link mt-3' style={{color:'#00ffff',fontSize:'12px',letterSpacing:'0.1rem',textTransform: 'uppercase',fontWeight:'bold'}} to='/reset-password' >FORGOT PASSWORD?</Link>
                    <button onClick={HandleSubmit} style={{backgroundColor:'#00ffff',color:'white',width:'80%',height:'40px',fontSize:'17px'}} className="login-button" type='submit'>LOG IN</button>
                </Form>
            </Right>
        </Item>

      
    </Container>
  );
}

export default Login;
