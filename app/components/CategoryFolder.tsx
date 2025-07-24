import * as React from 'react'
import styled from 'styled-components'
import FolderLabel from '../assets/icons/folder-label.svg'

interface FolderProps {
  categoryName: string
  translateY: number
}

export default function CategoryFolder({
  categoryName,
  translateY,
}: FolderProps) {
  return (
    <FolderContainer>
      <CategoryCard $translateY={translateY}>
        <CategoryLabelWrapper>
          <LabelImageWrapper>
            <FolderLabel
              width="100%"
              height="100%"
              preserveAspectRatio="none"
            />
          </LabelImageWrapper>

          <NameSticker>{categoryName}</NameSticker>
        </CategoryLabelWrapper>

        <CategoryBody />
      </CategoryCard>
    </FolderContainer>
  )
}

const FolderContainer = styled.div`
  position: relative;
  pointer-events: none;
  cursor: default;
  margin-top: -160px;

  @media screen and (max-width: 760px) {
    margin-top: 0px;
  }
`

const CategoryCard = styled.div<{ $translateY: number }>`
  @media screen and (max-width: 760px) {
    transform: ${({ $translateY }) => `translateY(${$translateY}px)`};
    transition: transform 0.3s ease;
    position: absolute;
    width: 100%;
  }
`

export const CategoryBody = styled.div`
  background-color: #dec0a4;
  height: 200px;
  border-radius: 12px;
`

const CategoryLabelWrapper = styled.div`
  position: absolute;
  padding: 4px 30px;
  top: -43px;
  pointer-events: none;

  @media screen and (max-width: 760px) {
    padding: 4px 12px;
    top: -38px;
  }
`

const LabelImageWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  /* filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.2)); */
`

const NameSticker = styled.div`
  background-color: #fffefb;
  min-width: 80px;
  max-width: 250px;
  position: relative;

  align-items: center;
  font-weight: 600;
  border-radius: 8px;
  outline: 2px solid #5d5d5d;
  padding: 8px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 24px;
  outline-offset: -5px;

  position: 'relative';

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`
