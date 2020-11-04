export const types = {
  quantity: 'quantity',
  product_type: 'product-type',
  option: 'option',
}

export const conditionColumns = [
  {
    text: 'Product title',
    value: 'title',
  },
  {
    text: 'Variant title',
    value: 'product_variant',
  },
]

export const productConditionRelations = [
  {
    text: 'equals',
    value: 'equal',
  },
  {
    text: 'contains',
    value: 'contain',
  },
  {
    text: 'starts with',
    value: 'start_with',
  },
  {
    text: 'ends with',
    value: 'end_with',
  },
  {
    text: 'matches phrase',
    value: 'match_phrase',
  },
]

export const quantityConditionRelations = [
  {
    text: 'matches template',
    value: 'match',
  },
]
