import styled from 'styled-components'
import Tag from './common/Tag'

interface CategoryTagProps {
  categoryName: string
  categoryColor: string
}

export default function CategoryTag({
  categoryColor,
  categoryName,
}: CategoryTagProps) {
  if (categoryName)
    return (
      <CategoryTagContainer>
        <Tag bgColor={`${categoryColor}` || 'transparent'}>
          {categoryName}
        </Tag>
      </CategoryTagContainer>
    )
}

const CategoryTagContainer = styled.div`
  margin-right: 8px;

  &:hover {
    cursor: pointer;
  }
`
