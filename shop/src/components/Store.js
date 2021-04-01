import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from './Card.js'

let imgSrcs = [
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGDJtw_hTiNTLTpJjR11cdQzG5BTsnW_5vCQ&usqp=CAU',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx1YstPZOtqUarwPVDTqcgbTr8H2fskRGOoQ&usqp=CAU',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLNYKzhbMrSGa9nUIISemiLsTN74yYLKjQsw&usqp=CAU',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQolow8ROR78nAXBxpZlPuJD4pFRkjaPa_1eg&usqp=CAU',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfbrpSfEu3yMVNFHNUaoZvDhk03LzAHtGBBA&usqp=CAU',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh5MJ_3b9lJLItmLggke5LHvuEnGri711ikg&usqp=CAU',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM92YAdxSWmEQ8c9sM4pe2Lo5-heoOF2CgoQ&usqp=CAU'
]

function TabPanel(props) {
  const { children, value, index, ...other } = props;
	
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Дэлгүүр"  icon={<FavoriteIcon />} {...a11yProps(0)} />
          <Tab label="Алтан" disabled icon={<FavoriteIcon />} {...a11yProps(1)} />
          <Tab label="Мөнгөн" disabled icon={<FavoriteIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
		<TabPanel value={value} index={0} style={{display: 'flex'}}>
		  {
			  imgSrcs.map(card => <Card imgSrc={card}/>)
		  }
      </TabPanel>
      <TabPanel value={value}  index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value}  index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}
