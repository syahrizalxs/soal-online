<template>
  <div class="default-container">
    <div id="sidebar">
			<div class="sidebar-top">
        <b-navbar toggleable="md" type="dark" variant="dark" class="__custom-navbar">
          <b-navbar-brand>E-Learning</b-navbar-brand>
        </b-navbar>
      </div>
			<div class="sidebar-bottom">
        <DefaultSidebar />
      </div>
		</div>
		<div id="rightSideWrapper">
			<header> 
				<DefaultHeader />
			</header>
			<div class="ContentBox">
			</div>
		</div>
  </div>
</template>

<script>
import DefaultHeader from './DefaultHeader'
import DefaultSidebar from './DefaultSidebar'
export default {
  name: 'default-container',
  components: {
    DefaultHeader,
    DefaultSidebar
  }
}
</script>
<style lang="scss" scoped>
*{ 
    margin: 0px;
}

#sidebar {
	/*Strictly Necessary */
	position:fixed; 
	height: 100%;
	width:20%;
	margin: 0px;  

  /*Aesthetics*/
  background: lightblue; 
  border-radius: 7px;  
}
.sidebar-top {
  width: 100%;
  height: 55.5px;
  background-color: #343a40 !important;
  border: none;
}
.sidebar-bottom {
  width: 100%;
  height: 100%;
}


#rightSideWrapper {
	/*Strictly Necessary */
	width:80%; 
	float: right;

	/*Aesthetics*/
	background: #fff;	
}

header {
	/*Strictly Necessary */
	position: fixed;
	width: 80%;	
	// height: 100px; /*Adjust the hight to your purposes*/
	
	/*Aesthetics*/
	background: lightSalmon;
	border-radius: 7px;
}

.ContentBox{
	margin-top: 60px; /*The height of the   header*/
	display:flex;
	flex-flow: row wrap;
} 

main, section, footer {
    /*Aesthetics*/
	 background: lightgray; 
	 border-radius: 7px; 
	 margin: 5px; 
	 padding: 20px;
}

main {
  /*Strictly Necessary */
  height: 400px;
  order: 1;
  flex: 0 1 100%; 
	
}

section {
  /*Strictly Necessary */
   height: 400px;
   order: 2;
   flex: 0 1 100%;
	
}

footer {
  /*Strictly Necessary */
  height: 100px;
  order: 3;
  flex: 0 1 100%;
	
}

</style>
