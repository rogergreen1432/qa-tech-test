import { createColumnHelper } from '@tanstack/react-table'
import { Article } from '../../types/NewsTypes'
import { EyeOpenIcon } from '@radix-ui/react-icons'
import { convertTimestampToDate } from '../../utils/dates'

export const publishedArticlesColumns = (
  setShowPopout: (show: boolean) => void,
  setPopoutData: (articleInfo: Article) => void,
) => {
  const columnHelper = createColumnHelper<Article>()

  const columnHelpers = [
    columnHelper.accessor('title', {
      header: 'Title',
    }),
    columnHelper.accessor('timestamp', {
      cell: (info) => convertTimestampToDate(info.getValue(), true),
      header: 'Published',
    }),
    {
      id: 'button',
      cell: (row: { row: { original: Article } }) => (
        <div
          className="w-16 h-9 bg-DownloadButtonPurple text-[#FFA500] rounded-lg flex justify-center items-center cursor-pointer ml-auto"
          onClick={() => {
            setPopoutData(row.row.original)
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
