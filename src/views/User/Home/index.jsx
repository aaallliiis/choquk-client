import React , {useEffect,useState} from 'react';
import {Box,Divider,makeStyles ,Button} from '@material-ui/core';
import Nav from '../../../components/NavBar';
import Cards from '../../../components/Cards';
import {getAllFields,getAllFiles} from '../../../api';

const useStyles = makeStyles({
    page:{
        backgroundColor: 'rgb(232, 243, 246)',
        overflow:'hidden',
    },
    main:{
        display:'flex',
    },
    tree: {
        height: 240,
        flexGrow: 1,
        maxWidth: 400,
    },
    left_sidebar:{
        overflowX:'hidden',
        overflowY:'auto',
        padding:10,
        paddingBottom:50,
        boxSizing:'border-box',
    },
    right:{
        backgroundColor: 'transparent',
        boxShadow:'-1px -10px 20px 0px #aaaaaa inset',
    },
    active:{
        backgroundColor:'#Dbe0e5'
    },
    fieldBtn:{
        width:'100%',
        margin:'5px 25px 0px 0px',
        border:'1px 0px 1px 0px solid red',
        marginRight:5,
        marginTop:10
    },
    courseBtn:{
        width:'91%',
        margin:'5px 25px 0px 0px',
        border:'1px 0px 1px 0px solid red'
    },
    fieldDiv:{
        width:'100%',
        textAlign:'right',
        fontWeight:'bold'
    },
    courseDiv:{
        width:'100%',
        textAlign:'right'
    },
    content:{
        display:'flex',
        flexWrap:'wrap',
        backgroundColor: 'transparent',
        overflowX:'hidden',
        overflowY:'auto',
        boxSizing:'border-box',
        paddingTop:'1rem',
        paddingBottom:'3rem',
        paddingRight:'6%'
    },
})

export default function Home(){
    const classes = useStyles();
    const [firstTime,setFirstTime] = useState(true);
    const [fields,setFields] = useState([]);
    const [files,setFiles] = useState([]);
    const [number,setNumber] = useState(10);
    
    const [selectedFields,setSelectedFields] = useState([]);
    const [selectedCourses,setSelectedCourses] = useState([]);

    useEffect(()=>{
        setFirstTime(false);
        getAllFields()
        .then(setFields)
        .catch(({response:{status}})=>{
            if(status===401){
                localStorage.clear();
                window.location.reload();
            }
        })
    },[])

    useEffect(()=>{
        getAllFiles({number})
        .then(setFiles)
        .catch(({response})=>console.log(response))
    },[number])

    return (
        <Box className={classes.page} height="100%" width="100%">            
            <Box className={classes.navbar} height="8%" width="100%">
                <Nav handleClick={()=>console.log('mmd')}/>
            </Box>
            <Box className={classes.main} height="92%" width="100%">
                {/* //? side bar section */}
                <Box className={classes.left_sidebar} height="100%" width="17%">
                    <div style={{textAlign:"center",marginBottom:10,fontWeight:'bolder'}}>رشته ها و درس ها</div>
                    <Divider/>
                    {fields.map(({name,_id,courses})=>
                        <React.Fragment>
                            <Button 
                                onClick={()=>{
                                    if(selectedFields.includes(_id))
                                        setSelectedFields(old=>old.filter(item=>item!==_id))
                                    else
                                        setSelectedFields(old=>([...old,_id]))
                                }} 
                                className={`${selectedFields.includes(_id)?classes.active:''} ${classes.fieldBtn}`} 
                            >
                                <div className={classes.fieldDiv}>
                                    {name}
                                </div>
                            </Button>
                            {courses.map(({name,_id})=>
                                <Button 
                                    onClick={()=>{
                                        if(selectedCourses.includes(_id))
                                            setSelectedCourses(old=>old.filter(item=>item!==_id))
                                        else
                                            setSelectedCourses(old=>([...old,_id]))
                                    }} 
                                    className={`${selectedCourses.includes(_id)?classes.active:''} ${classes.courseBtn}`} 
                                >
                                    <div className={classes.courseDiv}>
                                        {name}
                                    </div>
                                </Button>
                            )}
                        </React.Fragment>
                    )}
                </Box>
                { /*//?  show cards and tables and a button to change  */}
                <Box className={classes.right} height="100%" width="83%">
                    {/* //? search bar section */}
                    <Box className={classes.searchbox} height="15%" width="100%">
                        <Box className={classes.searchboxContainer} width="100%" height="100%">
                            {/* <Grid container justify="space-between" wrap='nowrap' alignItems="center">
                                <SearchBox
                                handleSearch={handleSearchBox}
                                history={[]}
                                text={searchBody.search_Text}/>
                                <SwitchBotton 
                                handldeChange={handleSwitchChange} 
                                checked={searchBody.isStatement} 
                                lable={searchPageSideBarHeaders.algebraic_search} width="20%"
                                />
                                <SwitchBotton
                                handldeChange={handleFileNameFilterSwitchChange} 
                                checked={searchBody.file_name_filter} 
                                lable={searchPageSideBarHeaders.file_name_filter} width="20%"
                                />
                            </Grid> */}
                        </Box>
                    </Box>
                    {/* //? materail table and card section */}
                    <Box className={classes.content} height="85%" width="100%">
                        {files.map(item=>
                            <Cards item={item}/>
                        )}
                    </Box>
                </Box>
            </Box>
            </Box>
    )
}
