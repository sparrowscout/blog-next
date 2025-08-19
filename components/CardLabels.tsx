'use-client'
import { getRandomNumber } from '@/utils/css-utils'
import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

interface LabelsProps {
  title: string
  isFocusing: boolean
  categoryColor: string
}

export default function CardLabels({
  title,
  isFocusing,
  categoryColor,
}: LabelsProps) {
  const [labelConfig, setLabelConfig] = useState<{
    yPosition: number
    categoryColor: string
    rotation: number
  }>()

  useEffect(() => {
    setLabelConfig({
      yPosition: getRandomNumber(-30, 50),
      rotation: getRandomNumber(5, -5),
      categoryColor,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (labelConfig)
    return (
      <CardTag
        $categoryColor={labelConfig.categoryColor}
        $yPosition={labelConfig.yPosition}
        $rotation={labelConfig.rotation}
        $isFocusing={isFocusing}
      >
        <CardTitle>{title}</CardTitle>
      </CardTag>
    )
}

const CardTag = styled.div<{
  $categoryColor: string
  $yPosition: number
  $rotation: number
  $isFocusing: boolean
}>`
  z-index: 1;
  pointer-events: none;
  position: absolute;
  transform: ${({ $yPosition }) =>
    `translateX(${$yPosition}%)`};
  transition: transform 0.2s ease;
  top: -12px;
  min-width: 100px;
  text-align: center;
  padding: 16px;
  background-color: ${(props) => props.$categoryColor};
  rotate: ${(props) => props.$rotation}deg;
  border: 1px solid black;

  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;

  ${({ $isFocusing }) =>
    $isFocusing &&
    css`
      rotate: 0deg;
      transform: translateX(12px);
    `}

  @media screen and (max-width: 760px) {
    padding: 8px;
    height: 33px;
  }
`

const CardTitle = styled.span`
  font-weight: 500;
  margin: 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`
