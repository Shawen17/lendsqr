import { Label,Title,Outline,Button,Select,Container,MiniContainer,Box, SearchContainer,Input, FormDisplay } from "../components/Styled";
import { useState } from "react";
import { provinces } from "../components/utility/AdminAction";
import { Link } from "react-router-dom";
import { Form } from "reactstrap";




const Signup=()=>{
    document.title = "signup";
    // const navigate = useNavigate()
    const [inputs,setInputs] = useState({})
    const [error,setError] = useState("")

    const handleChange = (event) => {
        setError("");
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
      };

    const HandleSubmit = async (event) => {
        event.preventDefault();
        // const email = inputs.email;
        // const first_name = inputs.first_name;
        // const last_name = inputs.last_name;
        // const state = inputs.state;
        const password = inputs.password;
        const re_password = inputs.re_password;
        if (password === re_password) {
        //   signup(email, first_name, last_name, state, password, re_password);
        //   setAccountCreated(true);
        } else {
          setError('password does not match')
        }
      };
    
    //   if (isAuthenticated) {
    //     navigate("/");
    //   }
    //   if (accountCreated) {
    //     navigate("/");
    //   }

    return (
        <Container>
        <Title>Add your Details</Title>

        <FormDisplay>
        <Form onSubmit={HandleSubmit}>
        <MiniContainer>
            <Box>
                <Label>First Name</Label>
                <SearchContainer>
                  <Input
                  required
                    placeholder="First Name"
                    type="text"
                    name="first_name"
                    value={inputs.first_name || "" }
                    onChange={handleChange}
                  />
                </SearchContainer>
                </Box>
                <Box>
                <Label>Last Name</Label>
                <SearchContainer>
                  <Input
                  required
                    placeholder="Your Surname"
                    type="text"
                    name="last_name"
                    value={inputs.last_name || ""}
                    onChange={handleChange}
                  />
                </SearchContainer>
                </Box>
        </MiniContainer>
        <MiniContainer>
            <Box>
                <Label>Email</Label>
                <SearchContainer>
                  <Input
                    placeholder="Email Address"
                    type="email"
                    name="email"
                    value={inputs.email || "" }
                    required
                    onChange={handleChange}
                  />
                </SearchContainer>
                </Box>
                <Box>
                <Label htmlFor="state">Province</Label>
                <SearchContainer>
                  <Select
                  required
                    name="state"
                    value={inputs.state || ""}
                    onChange={handleChange}
                  >
                     {provinces.map(province=>(
                        <option key={province.id} value={province.name}>{province.name}</option>
                     ))}
                    
                  </Select>
                </SearchContainer>
              </Box>
        </MiniContainer>
        <MiniContainer>
            <Box>
            <Label>Password</Label>
                <SearchContainer>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={inputs.password || "" }
                    required
                    minLength={8}
                    onChange={handleChange}
                  />
                </SearchContainer>
            </Box>
            {error}
            <Box>
            <Label>Confirm Password</Label>
                <SearchContainer>
                  <Input
                  required
                    placeholder="Confirm Password"
                    type="password"
                    name="re_password"
                    value={inputs.re_password || "" }
                    onChange={handleChange}
                  />
                </SearchContainer>
            </Box>
        </MiniContainer>
        <Button type="submit">Submit</Button>
        </Form>

        <Outline>
            <div style={{marginRight:4}}>
              Already have an account?
              </div>
              <Link className="nav-link sidebar-link" to="/">
                Login
              </Link>
            
          </Outline>
        </FormDisplay>
        

        </Container>
    )
}



export default Signup