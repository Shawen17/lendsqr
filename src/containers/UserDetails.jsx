import React,{useState} from 'react';
import styled from 'styled-components';
import {KeyboardBackspaceOutlined,StarOutlined,StarOutlineOutlined} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';



const Container = styled.div`
margin:8px;
display:flex;`

const Left = styled.div`
width:32%`

const Right= styled.div`
width:100%;
margin-left:20px;
`

const UserAction = styled.div`
display:flex;
justify-content: space-even;
align-items:center;
margin-left:80px;`

const UserActionButton = styled.button`
height:40px;
width:200px;
border-radius:6px;
font-size:15px;
font-weight:bold;
margin-right:10px;
border:1px solid ${props=> props.color};
color: ${props=> props.color}`

const Info = styled.div`
margin-left:80px;
background-color:white;
margin-top:30px;
border-radius:4px;
height:200px;
`

const Wrapper =styled.div`
display:flex;
justify-content:flex-start;
align-items:center;
color: #213F7D;
position:relative;
margin-bottom:50px;
padding-top:40px
`

const VerticalLine = styled.div`
border-left:1px solid #ccc;
height:100px;
margin-right:10px;`

const Rating = styled.div`
display:flex;
color:yellow;`

const ProfilePic = styled.img`
border-radius:50%;
height:100px;
width:100px;
margin-left:20px;
margin-right:20px;
color:#213F7D;

`
const Details = styled.div`
margin-left:80px;
background-color:white;
margin-top:50px;
display:flex;
flex-direction:column;
align-items:left;
border-radius:4px;
color: #213F7D;
position:relative;

`

const InfoWrapper = styled.div`
display:flex;
align-items:center;
justify-content:flex-start;
margin:20px 20px`

const PersonalInfo = styled.div`
display:flex;
flex-direction:column;
color:#545F7D;
margin-right:100px`

const Header= styled.p`
font-family: 'Work Sans';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 14px;
text-transform: uppercase;`

const HeaderValue = styled.p`
font-family: 'Work Sans';
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 19px;
`
const Tabs = styled.div`
display:flex;
font-family: 'Work Sans';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
justify-content:center;
align-items:center;

`

const TabDesc = styled.div`
text-align: center;
height:22px;
width:170px;
background-color:white;
cursor:pointer;

&:hover{
    color:#39CDCC;
    border-bottom:2px solid #39CDCC;
}
`

const HorizontalLine = styled.div`

border-bottom:1px solid #ccc;
width:977px;
margin:10px 10px;
`


const UserDetails = (props)=>{
    window.title='User-details'
    const [general,setGeneral]= useState(true)
    const [setDocument]= useState(false)
    const [setBank]= useState(false)
    const [setLoan]= useState(false)
    const [setSaving]= useState(false)
    const [setApp]= useState(false)

    var user= JSON.parse(localStorage.getItem('user'))
    var data = JSON.parse(localStorage.getItem('data'))
    
    const onClickGeneral =()=>{
        setGeneral(true);
        setDocument(false);
        setBank(false);
        setLoan(false);
        setSaving(false);
        setApp(false)
    }

    const onClickDocument =()=>{
        setGeneral(false);
        setDocument(true);
        setBank(false);
        setLoan(false);
        setSaving(false);
        setApp(false)
    }
    const onClickBank =()=>{
        setGeneral(false);
        setDocument(false);
        setBank(true);
        setLoan(false);
        setSaving(false);
        setApp(false)
    }
    const onClickLoan =()=>{
        setGeneral(false);
        setDocument(false);
        setBank(false);
        setLoan(true);
        setSaving(false);
        setApp(false)
    }
    const onClickSaving =()=>{
        setGeneral(false);
        setDocument(false);
        setBank(false);
        setLoan(false);
        setSaving(true);
        setApp(false)
    }
    const onClickApp =()=>{
        setGeneral(false);
        setDocument(false);
        setBank(false);
        setLoan(false);
        setSaving(false);
        setApp(true)
    }

    const buttonClick=(str)=>{
        if(str==='blacklist'){
            user.status= 'Blacklisted'
            const userIndex = data.findIndex(obj=>{
                return obj.id=== user[0].id
            })
            data[userIndex].status= 'Blacklisted'
            localStorage.setItem('data',JSON.stringify(data))
            alert(`user ${user[0].email} has been Blacklisted `)
        }else if(str==='activate'){
            user.status= 'Active'
            const userIndex = data.findIndex(obj=>{
                return obj.id=== user[0].id
            })
            data[userIndex].status= 'Active'
            localStorage.setItem('data',JSON.stringify(data))
            alert(`user ${user[0].email} has been Activated `)
            }
    }


    const displayGeneral =()=>(
       
        <Details>
            <p style={{fontSize:'16px',fontStyle:'normal',fontWeight:'bold',lineHeight:'19px',margin:'20px 20px'}}>Personal Information</p>
            
            <InfoWrapper>
                <PersonalInfo>
                    <Header>full Name</Header>
                    <HeaderValue>{`${user[0].profile.firstName} ${user[0].profile.lastName}`}</HeaderValue>
                </PersonalInfo>
                <PersonalInfo>
                    <Header>Phone Number</Header>
                    <HeaderValue>{user[0].profile.phoneNumber}</HeaderValue>
                </PersonalInfo>
                <PersonalInfo>
                    <Header>Email Address</Header>
                    <HeaderValue>{user[0].email}</HeaderValue>
                </PersonalInfo>
                <PersonalInfo>
                    <Header>Bvn</Header>
                    <HeaderValue> {user[0].profile.bvn}</HeaderValue>
                </PersonalInfo>
                <PersonalInfo>
                    <Header>Gender</Header>
                    <HeaderValue>{user[0].profile.gender}</HeaderValue>
                </PersonalInfo>
            </InfoWrapper>
            
            
            <InfoWrapper>
                <PersonalInfo>
                    <Header>Marital status</Header>
                    <HeaderValue>{user[0].maritalStatus}</HeaderValue>
                </PersonalInfo>
                <PersonalInfo>
                    <Header>Children</Header>
                    <HeaderValue>{user[0].children}</HeaderValue>
                </PersonalInfo>
                <PersonalInfo>
                    <Header>Type of residence</Header>
                    <HeaderValue>{user[0].typeofResidence}</HeaderValue>
                </PersonalInfo>
            </InfoWrapper>
            <HorizontalLine />
            <p style={{fontSize:'16px',fontStyle:'normal',fontWeight:'bold',lineHeight:'19px',margin:'20px 20px'}}>Education and Employment</p>
            <InfoWrapper>
                <PersonalInfo>
                    <Header>level of education</Header>
                    <HeaderValue>{user[0].education.level}</HeaderValue>
                </PersonalInfo>
                <PersonalInfo>
                    <Header>employment status</Header>
                    <HeaderValue>{user[0].education.employmentStatus}</HeaderValue>
                </PersonalInfo>
                <PersonalInfo>
                    <Header>sector of employment</Header>
                    <HeaderValue>{user[0].education.sector}</HeaderValue>
                </PersonalInfo>
                <PersonalInfo>
                    <Header>Duration of employment</Header>
                    <HeaderValue>{user[0].education.duration}</HeaderValue>
                </PersonalInfo>
            </InfoWrapper>
            <InfoWrapper>
                <PersonalInfo>
                    <Header>office email</Header>
                    <HeaderValue>{user[0].education.officeEmail}</HeaderValue>
                </PersonalInfo>
                <PersonalInfo>
                    <Header>Monthly income</Header>
                    <HeaderValue>{`₦${user[0].education.monthlyIncome[0]}-₦${user[0].education.monthlyIncome[1]}`}</HeaderValue>
                </PersonalInfo>
                <PersonalInfo>
                    <Header>loan repayment</Header>
                    <HeaderValue>{user[0].education.loanRepayment}</HeaderValue>
                </PersonalInfo>
            </InfoWrapper>
            <HorizontalLine />
            <p style={{fontSize:'16px',fontStyle:'normal',fontWeight:'bold',lineHeight:'19px',margin:'20px 20px'}}>Socials</p>
            <InfoWrapper>
                <PersonalInfo>
                    <Header>Twitter</Header>
                    <HeaderValue>{user[0].socials.twitter} </HeaderValue>
                </PersonalInfo>
                <PersonalInfo>
                    <Header>Facebook</Header>
                    <HeaderValue>{user[0].socials.facebook}</HeaderValue>
                </PersonalInfo>
                <PersonalInfo>
                    <Header>Instagram</Header>
                    <HeaderValue>{user[0].socials.instagram}</HeaderValue>
                </PersonalInfo>
            </InfoWrapper>
            <HorizontalLine />
            <p style={{fontSize:'16px',fontStyle:'normal',fontWeight:'bold',lineHeight:'19px',margin:'20px 20px'}}>Guarantor</p>
            <InfoWrapper>
                <PersonalInfo>
                    <Header>full Name</Header>
                    <HeaderValue>{`${user[0].guarantor.firstName} ${user[0].guarantor.lastName}`}</HeaderValue>
                </PersonalInfo>
                <PersonalInfo>
                    <Header>Phone Number</Header>
                    <HeaderValue>{user[0].guarantor.phoneNumber}</HeaderValue>
                </PersonalInfo>
                <PersonalInfo>
                    <Header>Email Address</Header>
                    <HeaderValue>debby@gmail.com</HeaderValue>
                </PersonalInfo>
                <PersonalInfo>
                    <Header>Relationship</Header>
                    <HeaderValue>Sister</HeaderValue>
                </PersonalInfo>
            </InfoWrapper>


        </Details>)

    const Display =()=> {
        if(general){
            var result= displayGeneral()
            return result
        }else{
            result= <h3 style={{margin:'30px 100px'}}>Coming soon</h3>
            return result
        }
    }
    
   
          
      
  return (
    
        <Container>
            <Left>
                <SideBar />
            </Left>
            <Right>
                <NavBar />
                <div style={{backgroundColor:'whitesmoke',marginTop:'10px',height:'100%'}}>
                    <Link style={{display: 'flex',marginLeft:'80px',color:'black',textDecoration:'none',paddingTop:'50px',marginBottom:'30px' }} to='/dashboard'><KeyboardBackspaceOutlined className='menu-bar'/><span>Back to Users</span></Link>
                    <UserAction>
                        <h3 style={{color:'#00308f'}}>User Details</h3>
                        <div style={{display:'flex',marginLeft:'auto'}}>
                            <UserActionButton  onClick={()=>{buttonClick('blacklist')}} color='red'>BLACKLIST USER</UserActionButton>
                            <UserActionButton  onClick={()=>{buttonClick('activate')}} color='aqua'>ACTIVATE USER</UserActionButton>
                        </div>
                    </UserAction>
                    <Info>
                        <Wrapper>
                            <ProfilePic src={user[0].profile.avatar} alt='avatar' />
                            <div style={{display:'flex',flexDirection:'column',marginRight:'30px'}}>
                                <h3>{`${user[0].profile.firstName} ${user[0].profile.lastName}`}</h3>
                                <p>{user[0].accountNumber}</p>
                            </div>
                            <VerticalLine styled={{marginRight:'30px'}} />
                            <div style={{display:'flex',flexDirection:'column',marginRight:'30px'}}>
                                <p style={{fontSize:'14px',fontFamily:'Work Sans',fontStyle:'normal',fontWeight:500,color:'#545F7D'}}>User's Tier</p>
                                <Rating><StarOutlined /><StarOutlineOutlined /><StarOutlineOutlined /> </Rating>
                            </div>
                            <VerticalLine styled={{marginRight:'30px'}} />
                            <div style={{display:'flex',flexDirection:'column'}}>
                                <p style={{fontSize:'22px',fontFamily:'Work Sans',fontStyle:'normal',fontWeight:'bold'}} >₦{user[0].accountBalance}</p>
                                <p style={{fontSize:'12px',fontFamily:'Work Sans',fontStyle:'normal',fontWeight:400}} >9912345678/Providus Bank</p>
                            </div>
                        </Wrapper>
                        <Tabs>
                            <TabDesc onClick={onClickGeneral} >General Details</TabDesc>
                            <TabDesc onClick={onClickDocument} >Documents</TabDesc>
                            <TabDesc onClick={onClickBank} >Bank Details</TabDesc>
                            <TabDesc onClick={onClickLoan} >Loans</TabDesc>
                            <TabDesc onClick={onClickSaving} >Savings</TabDesc>
                            <TabDesc onClick={onClickApp}  >App and System</TabDesc>
                        </Tabs>
                    </Info>
                    {Display()}
                </div>
            </Right>
            
        </Container>
        
      );
    } 

  

export default UserDetails;