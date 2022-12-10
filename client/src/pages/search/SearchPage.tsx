import React from "react";
import { useTextInput } from "../../hooks/input";
import { InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

export const SearchPage: React.FC = () => {
  const [urlParams] = useSearchParams();
  const searchedText = urlParams.get("text");
  const { value, onChange } = useTextInput(searchedText ?? undefined);

  console.log();
  return (
    <div>
      <TextField
        className="search__input"
        label="Поищем..."
        variant="outlined"
        value={value}
        onChange={onChange}
        fullWidth={true}
        // onFocus={onFocus}
        // onBlur={onBlur}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <div className="pt-5">
        <ButtonGroup
          variant="outlined"
          aria-label="outlined button group"
          color="primary"
        >
          <Button>Все</Button>
          <Button>100 Исполнителей</Button>
          <Button>30 Альбомов</Button>
          <Button>130 Треков</Button>
          <Button>10 Плейлистов</Button>
        </ButtonGroup>
      </div>

      <div className="pt-5">
        <div>
          <Typography variant="h6">Исполнители</Typography>
        </div>
      </div>
    </div>
  );
};
