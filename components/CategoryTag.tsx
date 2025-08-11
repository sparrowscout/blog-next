import styled from 'styled-components'

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
      <CategoryTagContainer $categoryColor={categoryColor}>
        {categoryName}
      </CategoryTagContainer>
    )
}

const CategoryTagContainer = styled.div<{
  $categoryColor: string
}>`
  background-color: ${({ $categoryColor }) =>
    $categoryColor || 'transparent'};
  padding: 4px;
  display: inline-block;
  margin-right: 8px;
  border: 1px solid black;
  width: fit-content;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`
