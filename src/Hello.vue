<template>
	<div>
		<p v-for="n in 5">{{greeting}} ! </p>
	</div>
</template>

<script>
	module.exports = 
	{
		data: function()
		{
			return {greeting : "Hello"}
		}
	}
</script>

<style>
p{
	color: blue;
	font-size: 2em;
	text-align: center;
}
</style>
