export const routes = [
  {
    path: '/quantity-detection',
    name: 'quantity-detection',
    meta: {
      title: 'Quantity Detection Rules',
    },
    component: () => import('./views/DetectQuantityForm'),
  },
  {
    path: '/product-mappings',
    name: 'product-mapping-list',
    meta: {
      title: 'Product Mapping Rules',
    },
    component: () => import('./views/ProductMappingList'),
  },
  {
    path: '/product-mappings/_new',
    name: 'product-mapping-_new',
    meta: {
      title: 'Add Product Mapping Rule',
    },
    component: () => import('./views/ProductMappingForm'),
  },
  {
    path: '/product-mappings/:id',
    name: 'product-mapping-update',
    meta: {
      title: 'Update Product Mapping Rule',
    },
    component: () => import('./views/ProductMappingForm'),
  },
  {
    path: '/option-mappings',
    name: 'option-mapping-list',
    meta: {
      title: 'Option Mapping Rules',
    },
    component: () => import('./views/OptionMappingList'),
  },
  {
    path: '/option-mappings/_new',
    name: 'option-mapping-_new',
    meta: {
      title: 'Add Option Mapping Rule',
    },
    component: () => import('./views/OptionMappingForm'),
  },
  {
    path: '/option-mappings/:id',
    name: 'option-mapping-update',
    meta: {
      title: 'Update Option Mapping Rule',
    },
    component: () => import('./views/OptionMappingForm'),
  },
  {
    path: '/order-mapping-fails',
    name: 'order-mapping-fails',
    meta: {
      title: 'Order Mapping Fails',
    },
    component: () => import('./views/OrderMappingFails'),
  },
]
