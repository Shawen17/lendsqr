# Lendsqr App

This is the dashboard for an Admin for a loan app, which gives the admin various functionalities, such as;
* seeing all users details
* search bar 
* filter with specific conditions
* activate and blacklist users

This app was developed with React with the following dependencies;
### Dependencies
- styled-components
- material-ui
- paginate
- reactstrap
- react-router-dom
- classnames
- axios

### Pages
- Login 
- Dashboard
- Userdetails

### Data
the data was fetched from [Lendsqr api endpoint](https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users),
though the data has many missing fields, i had to add random values after storing the data in LocalStorage with 

```
 var updatedData = JSON.parse(localStorage.getItem('data')).map((user)=>{
        if('status' in data){
            return {...user }
        }else{
            return {...user, status:getRandomItem(statusOptions), maritalStatus:getRandomItem(maritalStatus),
                children:getRandomItem(children), typeofResidence:getRandomItem(typeofResidence),  guarantorRelationship:getRandomItem(relationship) }
        }
    })
    localStorage.setItem('data',JSON.stringify(updatedData))
```

### Behaviour
- It is a responsive app that changes the layout when the screen width is 568px and below by removing the sidebar and replacing it with a Menu icon.
- On the click of the Menu icon, the sidebar displays.
- Each row in the dashboard table represents a user and an action button that enables the admin to 'ViewDetails','Activate' or 'Blacklist' a user.
- To use the filter condition, click on any of the Table's headers and the filter form is displayed.
- Blacklist and Activate users by clicking corresponding buttons in Userdetails page.

### Live Demo
This is just a demo as there is no admin authentication needed, just click on login from the [homepage](https://oluwaseun-johnson-lendsqr-fe-test.netlify.app/) and it tasks you directly to the dashboard.

### Clone

- Clone this repo to your local machine using [this repo](https://github.com/Shawen17/lendsqr-fe-test)
    



