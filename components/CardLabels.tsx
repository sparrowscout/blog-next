'use-client'
import { getRandomNumber } from '@/utils/css-utils'
import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import Tag from './common/Tag'

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
        $yPosition={labelConfig.yPosition}
        $rotation={labelConfig.rotation}
        $isFocusing={isFocusing}
      >
        <Tag bgColor={labelConfig.categoryColor}>
          <CardTitle>{title}</CardTitle>
        </Tag>
      </CardTag>
    )
}

const CardTag = styled.div<{
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
  rotate: ${(props) => props.$rotation}deg;

  ${({ $isFocusing }) =>
    $isFocusing &&
    css`
      rotate: 0deg;
      transform: translateX(12px);
    `}
`

const CardTitle = styled.span`
  font-weight: 500;
  margin: 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`
