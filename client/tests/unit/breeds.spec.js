import { shallowMount, createLocalVue } from '@vue/test-utils'
import Breeds from '@/views/Breeds.vue'
import BreedHeader from '@/components/BreedHeader.vue'
import BreedList from '@/components/BreedList.vue'

/* We import createLocalVue to load Buefy and don't
 * have warnings due to its own components. */
const localVue = createLocalVue()
const wrapper = shallowMount(Breeds, { localVue })

describe('Breeds View', () => {
	const main = wrapper.get('#breeds')

	it('Should has a BreedHeader Component', () => {
		const breedHeaderComponent = main.findComponent(BreedHeader)
		expect(breedHeaderComponent.exists()).toBeTruthy()
	})

	it('Should has a BreedList Component', () => {
		const breedListComponent = main.findComponent(BreedList)
		expect(breedListComponent.exists()).toBeTruthy()
	})
})
