<template lang='pug'>
section#side-bar
	b-sidebar(
		type='is-primary-light'
		:can-cancel='canCancel'
		:fullheight='fullheight'
		:fullwidth='fullwidth'
		:open.sync='open'
	)
		div#menu-container
			b-menu
				b-menu-list( label='Menu' )
					b-menu-item#panel(
						label='Panel'
						icon-pack='fas'
						icon='database'
						v-if='isAdmin'
					)
						span#panel-home(
							@click='changeSideBarState()'
						)
							b-menu-item(
								label='Home'
								icon-pack='fas'
								icon='home'
								tag='router-link'
								to='/panel'
							)
						span#panel-services(
							@click='changeSideBarState()'
						)
							b-menu-item(
								label='Services'
								icon-pack='fas'
								icon='database'
								tag='router-link'
								to='/panel/services'
							)
						span#panel-breeds(
							@click='changeSideBarState()'
						)
							b-menu-item(
								label='Breeds'
								icon-pack='fas'
								icon='database'
								tag='router-link'
								to='/panel/breeds'
							)
					b-menu-item#schedule(
						label='Schedule'
						icon-pack='fas'
						icon='calendar'
					)
						span#schedule-home(
							@click='changeSideBarState()'
						)
							b-menu-item(
								label='Home'
								icon-pack='fas'
								icon='home'
								tag='router-link'
								to='/'
							)
						span#schedule-clients(
							@click='changeSideBarState()'
						)
							b-menu-item(
								label='Clients Book'
								icon-pack='fas'
								icon='address-book'
								tag='router-link'
								to='/clients'
							)
						span#schedule-pets(
							@click='changeSideBarState()'
						)
							b-menu-item(
								label='Pets Book'
								icon-pack='fas'
								icon='paw'
								tag='router-link'
								to='/pets'
							)
					b-menu-item#hospital(
						label='Hospital'
						icon-pack='fas'
						icon='hospital'
					)
						span(
							@click='changeSideBarState()'
						)
							b-menu-item(
								label='Home'
								icon-pack='fas'
								icon='home'
								tag='router-link'
								to='/hospital'
							)
					b-menu-item#inventory(
						label='Inventory'
						icon-pack='fas'
						icon='warehouse'
					)
						span(
							@click='changeSideBarState()'
						)
							b-menu-item(
								label='Home'
								icon-pack='fas'
								icon='home'
								tag='router-link'
								to='/inventory'
							)
				b-menu-list#actions( label='Actions' )
					span( @click='logOut()' )
						b-menu-item(
							label='Log Out'
							icon-pack='fas'
							icon='sign-out-alt'
						)
				b-menu-list#about( label='About' )
					b-menu-item(
						label='Contributing'
						icon-pack='fas'
						icon='beer'
						tag='a'
						:href='contribute'
						target='_blank'
					)
					b-menu-item(
						label='Found a Bug?'
						icon-pack='fas'
						icon='bug'
						tag='a'
						:href='bug'
						target='_blank'
					)
					b-menu-item(
						label='License'
						icon-pack='fas'
						icon='balance-scale'
						tag='a'
						:href='mit'
						target='_blank'
					)
				br
				b-button(
					type='is-primary'
					icon-pack='fas'
					icon-left='times'
					@click='changeSideBarState()'
				) Close
</template>

<script lang='js'>
export default {
	name: 'SideBar',
	data() {
		return {
			canCancel: false,
			fullwidth: true,
			fullheight: true,
			contribute: 'https://www.buymeacoffee.com/andrsrz',
			bug: 'https://github.com/Andrsrz/tyra-web/issues/new',
			mit: 'https://mit-license.org/',
			isAdmin: false
		}
	},
	computed: {
		user(){
			return this.$store.state.user
		},
		open(){
			return this.$store.state.sideBarOpen
		}
	},
	methods: {
		init(){
			if(this.user.type.name === 'admin')
				this.isAdmin = true
			else
				this.isAdmin = false
		},
		changeSideBarState(){
			this.$store.commit('changeSideBarState')
		},
		logOut(){
			this.$store.commit('logOutUser')
			this.$cookies.remove('user')
			this.changeSideBarState()
			this.$router.push({ name: 'log-in' })
		}
	},
	created(){
		this.init()
	}
}
</script>

<style scoped>
#menu-container {
  padding: 1em;
}
</style>
