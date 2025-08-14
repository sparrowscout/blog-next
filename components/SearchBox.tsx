'use client'

import { useEffect, useMemo, useState } from 'react'
import Fuse, { FuseResult } from 'fuse.js'
import BlogPost from './BlogPost'
import { PostMeta } from '@/types/postData.types'
import SearchButton from './header/SearchButton'
import IconWrapper from './common/IconWrapper'
import DeleteIcon from '@/assets/icons/close.svg'
import Notice, { NoticeText } from './common/Notice'
import { useIsIOSChrome } from '@/hooks/useIsIOSChrome'
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function SearchBox() {
  const [docs, setDocs] = useState<PostMeta[]>([])
  const [q, setQ] = useState('')
  const [results, setResults] = useState<
    FuseResult<PostMeta>[]
  >([])
  const isScrollbarOverlay = useIsIOSChrome()

  useEffect(() => {
    // 절대경로 + basePath를 안전하게 붙여서 GH Pages에서도 동작
    fetch(`${BASE}/search-index.json`)
      .then((r) => r.json())
      .then(setDocs)
  }, [])

  const fuse = useMemo(
    () =>
      new Fuse(docs, {
        includeScore: true,
        includeMatches: true, // 하이라이트/스니펫 만들 때 사용
        findAllMatches: true, // 본문 여러 곳 매치 허용
        ignoreLocation: true, // ★ 긴 본문에서도 잘 매칭되게
        minMatchCharLength: 2,
        threshold: 0.3,
        keys: [
          { name: 'title', weight: 0.6 }, // 제목 가중치 ↑
          { name: 'content', weight: 0.35 }, // 본문도 검색
          { name: 'tags', weight: 0.05 },
        ],
      }),
    [docs],
  )

  useEffect(() => {
    if (!q) return setResults([])
    setResults(fuse.search(q))
  }, [q, fuse])

  return (
    <div className="relative z-50 box-border h-dvh w-full space-y-2 overflow-hidden  bg-white">
      <div className="fixed  top-3 box-border flex w-full justify-between gap-2 px-3">
        <div className="relative w-full">
          <input
            className="box-border h-14 w-full  border-[1px] border-black bg-white px-3 !text-[#ff01ff] outline-none "
            id="search input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="검색어를 입력해주세요 ~"
            autoFocus
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ('')}
              className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center text-gray-400 hover:text-black active:bg-[#ff01ff] active:[&_svg]:!fill-white"
            >
              <IconWrapper size="s">
                <DeleteIcon />
              </IconWrapper>
            </button>
          )}
        </div>

        <div className="w-fit">
          <SearchButton />
        </div>
      </div>

      {q.length > 0 && results.length === 0 && (
        <Notice
          noticeType={NoticeText.SEARCH_RESULT_EMPTY}
        />
      )}
      <div
        className={`h-dvh overflow-y-scroll px-3 pt-20 ${isScrollbarOverlay ? '' : 'pr-2'}`}
      >
        <ul className="space-y-2">
          {results.map((r, index) => (
            <li key={index} className="last:pb-96">
              <BlogPost post={r.item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
