/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: trusted SVG from material-file-icons */
/* eslint-disable @eslint-react/dom/no-dangerously-set-innerhtml, react/no-danger */
/* oxlint-disable react-perf/jsx-no-new-object-as-prop */
import { getIcon } from 'material-file-icons'
const FileIcon = ({ name, className }: { className?: string; name: string }) => {
    const icon = getIcon(name)
    return <span className={className} dangerouslySetInnerHTML={{ __html: icon.svg }} />
  },
  FolderIcon = ({ className, open }: { className?: string; open?: boolean }) => {
    const icon = open ? getIcon('.folder-open') : getIcon('.folder')
    return <span className={className} dangerouslySetInnerHTML={{ __html: icon.svg }} />
  }
export { FileIcon, FolderIcon }
