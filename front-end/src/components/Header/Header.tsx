import React from 'react';
import { AppBar, Toolbar, List, ListItem, Button } from '@material-ui/core'
import './Header.css'
import { Link } from 'react-router-dom';


    // list: {
    //   ...defaultFont,
    //   fontSize: "14px",
    //   margin: 0,
    //   paddingLeft: "0",
    //   listStyle: "none",
    //   paddingTop: "0",
    //   paddingBottom: "0",
    //   color: "inherit",
    // },
    // listItem: {
    //   float: "left",
    //   color: "inherit",
    //   position: "relative",
    //   display: "block",
    //   width: "auto",
    //   margin: "0",
    //   padding: "0",
    //   [theme.breakpoints.down("sm")]: {
    //     width: "100%",
    //     "&:after": {
    //       width: "calc(100% - 30px)",
    //       content: '""',
    //       display: "block",
    //       height: "1px",
    //       marginLeft: "15px",
    //       backgroundColor: "#e5e5e5",
    //     },
    //   },
    // },
    // listItemText: {
    //   padding: "0 !important",
    // },
    

type props = {

}

type state = {
   
}

class Header extends React.Component<props, state> {
    state: state = {
        
    }

    render(){
        return (
            <AppBar className="app-bar">
                <Toolbar>
                    <List className="heading left">
                        <ListItem>
                            <Button
                            component={Link}
                            to="/"
                            >
                            Pride In Writing
                            </Button>
                        </ListItem>
                    </List>
                    <List className="heading">
                        <ListItem>
                            <Button
                            component={Link}
                            to="/Authors"
                            >
                            Authors
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Button
                            component={Link}
                            to="/Books"
                            >
                            Books
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Button
                            component={Link}
                            to="/Publishers"
                            >
                            Publishers
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Button
                            component={Link} 
                            to="/AboutUs"
                            style={{width: 140}}
                            >
                            About Us
                            </Button>
                        </ListItem>
                    </List>
                </Toolbar>
            </AppBar>
        )
    }

}

export default Header