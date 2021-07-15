import React from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const StyledShowMoreButton = withStyles({
  root:{
    background:'#AAAAAA',
    borderRadius:5,
    height:35,
    marginTop:10,
    position:'relative',
    bottom:0,
    right:'41%'
  },
  label: {
    textTransform: 'capitalize',
  },
  '&:hover':{
    backgroundColor:'#AAAAAA',
  },
})(Button)


export default function ShowMore ({onClick}) {
    return <StyledShowMoreButton onClick={onClick} >نمایش بیشتر</StyledShowMoreButton>;
}


