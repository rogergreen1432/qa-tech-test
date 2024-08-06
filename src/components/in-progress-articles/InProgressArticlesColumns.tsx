import { createColumnHelper } from '@tanstack/react-table'
import { convertTimestampToDate } from '../../utils/dates'
import { Article, ArticleInProgress } from '../../types/NewsTypes'
import { EyeOpenIcon } from '@radix-ui/react-icons'

export const inProgressArticlesColumns = (
  setShowPopout: (show: boolean) => void,
  setInProgressArticleId: (articleInfo: number) => void,
) => {
  const columnHelper = createColumnHelper<Article>()

  const columnHelpers = [
    columnHelper.accessor('title', {
      header: 'Title',
    }),
    columnHelper.accessor('timestamp', {
      cell: (info) => convertTimestampToDate(info.getValue(), true),
      header: 'Created',
    }),
    {
      id: 'button',
      cell: (row: { row: { original: ArticleInProgress } }) => (
        <div
          className="w-16 h-9 bg-DownloadButtonPurple text-[#FFA500] rounded-lg flex justify-center items-center cursor-pointer ml-auto"
          onClick={() => {
            setInProgressArticleId(row.row.original.id)
            setShowPopout(true)
          }}
        >
          <p className="text-xs font-medium">View</p>
          <EyeOpenIcon className="h-4 w-4 ml-1 text-[#FFA500]" />
        </div>
      ),
    },
  ]

  return columnHelpers
}
