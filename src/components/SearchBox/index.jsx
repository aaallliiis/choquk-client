import React, {useEffect,useState} from 'react';
import {TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  searchBox:{
    marginRight:30,
    marginTop:5,
    marginBottom:5,
    '& .MuiOutlinedInput-root':{
      borderRadius:50,
      '& fieldset': {
        borderColor:'white',
      },
      '&:hover fieldset': {
        borderColor: '#aaaaaa',
      },
    },
  },
  icon:{
    cursor:'pointer',
    borderRadius:50,
    width:30,
    height:30,
    transform:'translateX(160%)'
  },
})

export default function SearchBox({handleSearch}) {
  const classes = useStyles()

  //* input value of search box
  const [inputValue, setInputValue] = useState('');
  
  //? check if the pressed key is ENTER then search
  const handleKeyPres =({key,target:{value}})=>{
    if(key==="Enter"){
      setInputValue(value);
      handleSearch(value);
    }
  }

  useEffect(()=>{
    var searchBox=document.getElementById('searchBox')
    searchBox.style="font-family:vazir-regular"
    if(searchBox.parentElement.children[1].tagName!=='FIELDSET'){
      searchBox.parentElement.children[1].remove()
    }
    searchBox.style="font-family:vazir-regular"
    var mainSearchBoxElement = searchBox.parentElement
    mainSearchBoxElement.style="padding-right:20px"
  },[])
  
  return (
    <div style={{display:'flex',width:'100%', justifyContent:'flex-start',alignItems:'center'}}>
      <Autocomplete
        className={classes.searchBox}
        id="searchBox"
        onClose={()=>setInputValue(inputValue)}
        inputValue={inputValue}
        options={[]}
        getOptionLabel={option => option.title}
        style={{ width: "100%" }}
        hiddenLabel="true"
        onInputChange={(event, newInputValues)=>setInputValue(newInputValues)}
        renderInput={params => <TextField className={classes.text} style={{
          backgroundColor:'white',
          borderRadius:50,
        }} placeholder="جستجو کنید ..." {...params}  variant="outlined" />
        }
        onKeyPress={handleKeyPres}
      />
      <SearchIcon className={classes.icon} onClick={()=>handleSearch(inputValue)}/>
    </div>
  );
}
