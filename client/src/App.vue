<template lang='pug'>
div#app
	NavBar
	router-view#router
</template>

<script lang='js'>
import axios from 'axios'
import NavBar from '@/components/NavBar.vue'

export default {
	name: 'app',
	components: { NavBar },
	data() {
		return {
			status: '',
			error: ''
		}
	},
	methods: {
		/* Redirect to LogIn page if there is no user stored */
		init(){
			if(!this.$cookies.get('user'))
				this.$router.push({ name: 'log-in' }).catch(() => {})
			else
				this.fillUserFromCookies()
		},
		setOnSuccess(response, user){
			this.status = response.status

			if(this.status === 200)
				this.$store.commit('fillUser', user)
		},
		setOnError(error){
			if(error.response){
				this.status = error.response.status
				this.error = error.response.statusText
			}else if(error.request){
				this.error = error.request
			}else{
				this.error = error.message
			}
			console.error(this.error)

			/* Redirect to LogIn if any error occurs */
			this.$router.push({ name: 'log-in' }).catch(() => {})
		},
		fillUserFromCookies(){
			const user = {
				_id: this.$cookies.get('user')._id,
				username: this.$cookies.get('user').username,
				type: this.$cookies.get('user').type,
				token: this.$cookies.get('user').token
			}

			this.validateUser(user)
		},
		/* POST request to our API
		 * To check if the User from the cookies exists in the
		 * database. */
		async validateUser(user){
			axios.get(process.env.VUE_APP_TYRAWEB_FIND_USER, {
				params: {
					id: user._id
				},
				headers: {
					Authorization: 'Bearer ' + user.token
				}
			}).then((response) => {
				this.setOnSuccess(response, user)
			}).catch((error) => {
				this.setOnError(error)
			})
		}
	},
	created(){
		this.init()
	}
}
</script>

<style lang='css' scoped>
#app {
  height: 100%;
}
</style>
