import React from "react";
import { Note } from "../../models/Note";
import { List, } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const NotesList = ({
  notes,
  onDelete,
  onSelect,
  selectedId,
}: {
  notes: Note[];
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  selectedId: string | undefined;
}) => {
  return (
    <List
      className="noteListContainer"
      itemLayout="horizontal"
      dataSource={notes}
      renderItem={(note, index) => {
        return (
          <List.Item
          style={{background: note.id === selectedId ? '#F1F1F1' : '#FFFFFF'}}
            key={note.id}
            actions={[
              <DeleteOutlined
                style={{ cursor: "grab/pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note.id)}
                }
              />,
            ]}
            onClick={() => onSelect(note.id)}
          >
            <List.Item.Meta
              title={note.createdAt.toUTCString()}
              description={`${note.plainText.slice(0, 15)}...`}
            />
          </List.Item>
        );
      }}
    />
  );
};
