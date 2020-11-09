import { v4 as uuid } from 'uuid';

export default [
	{
		id: uuid(),
		index: 0,
		createdAt: '27/03/2019',
		count: 0,
		description: '80% Ethanol-based Hand Rub Sanitizer and Disinfectant',
		media: '/static/images/products/product_1.png',
		title: 'Sanitizers',
		totalDownloads: '594'
	},
	{
		id: uuid(),
		index: 1,
		createdAt: '31/03/2019',
		count: 0,
		description: 'Latex Medical Examination Disposable Hand Gloves',
		media: '/static/images/products/product_2.png',
		title: 'Gloves',
		totalDownloads: '625'
	},
	{
		id: uuid(),
		index: 2,
		createdAt: '03/04/2019',
		count: 0,
		description:
			'N95 / KN95 FFP2 5 Layer Reusable Anti - Pollution , Anti - Virus Breathable Face Mask',
		media: '/static/images/products/product_3.png',
		title: 'Masks',
		totalDownloads: '857'
	},
	{
		id: uuid(),
		index: 3,
		createdAt: '04/04/2019',
		count: 0,
		description: 'Disposable Overall Cover PPE Gown',
		media: '/static/images/products/product_4.png',
		title: 'Gowns',
		totalDownloads: '406'
	}
];
