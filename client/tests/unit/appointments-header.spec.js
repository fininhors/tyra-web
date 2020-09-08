import { shallowMount, createLocalVue } from '@vue/test-utils'
import moment from 'moment'
import Buefy from 'buefy'
import store from '@/store'
import AppointmentsHeader from '@/components/AppointmentsHeader.vue'

/* We import createLocalVue to load Buefy and store */
const localVue = createLocalVue()
localVue.use(Buefy)

const wrapper = shallowMount(AppointmentsHeader, { store, localVue })

describe('AppointmentsHeader Component', () => {
	const today = new Date()
	const formattedToday = moment(today).format('MMMM Do YYYY')

	it('Set the correct default data', () => {
		expect(typeof AppointmentsHeader.data).toBe('function')
		const defaultData = AppointmentsHeader.data()
		expect(defaultData.formattedToday).toMatch(formattedToday)
	})
})
