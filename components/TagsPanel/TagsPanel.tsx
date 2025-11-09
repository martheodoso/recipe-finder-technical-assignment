import Tag from "../Tag/Tag";
import { v4 as uuidv4 } from 'uuid';

type TagsPanelProps = {
	tags: string[];
	handleTagClick: (e: React.MouseEvent<HTMLButtonElement>, tag: string) => void;
}

const TagsPanel = ({ tags, handleTagClick }: TagsPanelProps) => {

	return tags && tags.length > 0 ? (
		<div className="flex space-x-2 overflow-x-auto py-2">
			{tags.map((tag) => (
				<Tag key={uuidv4()} title={tag} handleTagClick={(e) => handleTagClick(e, tag)} />
			))}
		</div>
	) : null;
}

export default TagsPanel;