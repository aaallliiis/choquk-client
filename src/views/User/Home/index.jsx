import React , {useState} from 'react';
import {Box, Button, Grid, TextField, IconButton, InputAdornment,makeStyles } from '@material-ui/core';
import Nav from '../../../components/NavBar';

const useStyles = makeStyles({
    page:{
        // backgroundColor: colors.background,
        overflow:'hidden',
      },
    main:{
        display:'flex',
      },
      left_sidebar:{
        backgroundColor: 'transparent',
        borderLeft:'1px',
        // borderLeftColor:colors.fourth,
        borderLeftStyle:'solid',
        overflowX:'hidden',
        overflowY:'auto',
        padding:10,
        paddingBottom:50,
        boxSizing:'border-box',
      },
      right:{
        backgroundColor: 'transparent'
      },
})

export default function Home(){
    const classes = useStyles();

    return (
        <Box className={classes.page} height="100%" width="100%">            
            <Box className={classes.navbar} height="8%" width="100%">
                <Nav handleClick={()=>console.log('mmd')}/>
            </Box>
            <Box className={classes.main} height="92%" width="100%">
                {/* //? side bar section */}
                <Box className={classes.left_sidebar} height="100%" width="18%" minWidth={300}>
                    <Box padding='0.2rem' marginBottom="1rem">
                        <Box className={classes.box} width="100%" height="100%" minHeight={150}>
                            {/* <p className={classes.headerContent}>{searchPageSideBarHeaders.tag}</p>
                            <CustomizedAutoComplete handleTags={(array)=>handleTags(array)} /> */}
                        </Box>
                    </Box>
                    {/*//? check box for type selection */}
                    <Box padding="0.2rem" marginBottom="1rem">
                        <Box className={classes.box}>
                            {/* <p className={classes.headerContent}>{searchPageSideBarHeaders.data_type}</p>
                            <Box>
                                {Object.entries(searchPageDataTypeConentPersian).map(([, value])=><Box>
                                <StyledCheckbox content={value} 
                                    checked={searchBody.material_Type.includes(value)}
                                    onClick={({target:{checked}})=>{
                                    handleTypeCheckBox(value,checked);
                                    }}
                                />
                                </Box>)}
                            </Box> */}
                        </Box>
                    </Box>
                    {/*//? project check box section */}
                    <Box padding="0.2rem" marginBottom="1rem">
                        <Box className={classes.box}>
                            {/* <p className={classes.headerContent}>{searchPageSideBarHeaders.projects}</p>
                            {projectLoading?<CircularProgress/>:
                                <Box height='90%' style={{overflowY:'auto'}}>
                                {allProjects.map(item => 
                                    <Box>
                                    <StyledCheckbox 
                                        checked={searchBody.project.includes(item._id.$oid)}
                                        content={item.title} 
                                        onClick={({target:{checked}})=>{
                                        handleProjectCheckBox(checked,item._id.$oid)
                                        }}
                                    />
                                    </Box>
                                )}
                                </Box>
                            } */}
                        </Box>
                    </Box>
                    {/*//? security selection */}
                    <Box padding="0.2rem" marginBottom="1rem">
                        <Box className={classes.box}>
                            {/* <p className={classes.headerContent}>{searchPageSideBarHeaders.security}</p>
                            {
                            searchPageSecurityHeaders.map(({title,id})=><Box>
                                <StyledCheckbox content={title} 
                                checked={searchBody.confidentiality_level.includes(title  )}
                                onClick={({target:{checked}})=>{
                                handleconfidentialityLevelCheckBox(title,checked);
                                }}
                                />
                            </Box>) 
                            } */}
                        </Box>
                    </Box>
                    {/*//? date selection */}
                    <Box padding="0.2rem" marginBottom="1rem">
                        <Box className={classes.box}>
                            {/* <Box className={classes.headerBox}>
                                <Box width="100%">
                                <hr style={{marginBottom:"6%"}}/>
                                </Box>
                                <Box width={170}> */}
                                {/* <p className={classes.headerContent}>{searchPageSideBarHeaders.time_picker}</p> */}
                                {/* </Box>
                            </Box> */}
                            {/* //? start time picker */}
                            {/* <Box my={2}>
                                <Grid
                                container
                                direction="row-reverse"
                                justify="space-around"
                                alignItems="center"
                                >
                                <CustomizedDatePicker hanldeDate={(date)=>handleDatePicker(date,'date_start')}/>
                                <span>{searchPageSideBarHeaders.from}</span>
                                </Grid>
                            </Box> */}
                            {/* //? end time picker */}
                            {/* <Box>
                                <Grid
                                container
                                direction="row-reverse"
                                justify="space-around"
                                alignItems="center"
                                >
                                <CustomizedDatePicker  hanldeDate={(date)=>handleDatePicker(date,'date_end')}/>
                                <span>{searchPageSideBarHeaders.till}</span>
                                </Grid>
                            </Box> */}
                            {/* //? reset btn */}
                            {/* <Box style={{marginTop:20}}> 
                                {(searchBody.date_start!==""||searchBody.date_end!=="")&&<Button onClick={resetDates}>
                                {searchPageSideBarHeaders.reset}</Button>}
                            </Box> */}
                        </Box>
                    </Box>
                </Box>
                { /*//?  show cards and tables and a button to change  */}
                <Box className={classes.right} height="100%" width="82%">
                    {/* //? search bar and toggle btn section */}
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
                        {/* <CustomizedButtons keepActive={keepActive} handleClick={(value)=>setKeepActive(value)}/> */}
                        {/* {
                            loading?<CircularProgress/>:
                            allMaterial.length===0?
                                notFound?
                                <div style={{color:'red'}}>
                                    {searchPageSideBarHeaders.notFound}
                                </div>
                                :
                                <button onClick={Search}>{searchPageSideBarHeaders.tryAgain}</button>
                                :
                            keepActive?allMaterial.map(element =><Cards searchedText={query.get('search')} data={element} />)
                            :
                            <Tables searchedText={query.get('search')} columns={columns} data={allMaterial} showCheckbox={false} showDelete={false}/>
                        }
                        {
                            loading||allMaterial.length===0||finished?null:<ShowMore onClick={handleShowMore}/>
                        } */}
                    </Box>
                </Box>
            </Box>
            </Box>
    )
}
