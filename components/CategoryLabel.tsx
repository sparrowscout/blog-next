'use client'
import * as React from 'react'
import styled from 'styled-components'

interface CategoryLabelProps {
  categoryName: string
  categoryColor: string
}

export default function CategoryLabel({
  categoryName,
  categoryColor,
}: CategoryLabelProps) {
  if (categoryName)
    return (
      <CategoryLabelContainer
        $categoryColor={categoryColor}
      >
        {categoryName}
      </CategoryLabelContainer>
    )
}

const CategoryLabelContainer = styled.div<{
  $categoryColor: string
}>`
  position: absolute;
  z-index: -99;
  top: -60px;
  left: -40px;
  color: black;
  padding: 16px 40px;
  padding-bottom: 50px;
  min-width: 80px;
  rotate: 0deg;
  background-color: ${({ $categoryColor }) =>
    $categoryColor};
  text-align: center;
  outline-offset: -5px;
  border: 1px solid black;

  @media screen and (max-width: 760px) {
    padding: 16px 24px 40px 40px;
    top: -56px;
    left: -24px;
  }
`
