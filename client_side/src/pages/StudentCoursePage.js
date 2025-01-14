import React, { useState } from "react";
import { useEffect } from "react";
import ProjectPreview from "components/project/ProjectPreview";
import axios from 'axios';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import PreferenceForm from "components/forms/PreferenceForm";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: "1.5px solid #9F9F9F",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  marginRight: "1rem",
  marginLeft: 0,
  boxShadow: "none",
  [theme.breakpoints.up("sm")]: {
    width: "40ch",
    marginLeft: theme.spacing(1),
    "&:focus": {
      width: "30ch", // Increase the focused width here
    },
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "none",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "100%",
    boxShadow: "none",
    [theme.breakpoints.up("sm")]: {
      width: "40ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginLeft: theme.spacing(7),
  background: "whitesmoke",
  borderRadius: "10px",
  marginRight: theme.spacing(7),
  marginTop: theme.spacing(7),
  marginBottom: theme.spacing(7),
}));

const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#0097EB",
  fontSize: "16px",
  fontFamily: "Poppins",
  color: theme.palette.common.white,
  whiteSpace: "normal",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const HoverTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    cursor: "pointer",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "14.5px",
  fontFamily: "Poppins",
  whiteSpace: "normal",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "1px",
}));


function StudentCoursesPage({ data }) {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [preview, setPreview] = useState(false);

  const [selected, setSelected] = React.useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    setProjects(data.projects);
    setFilteredProjects(data.projects);
  }, [data]);

  useEffect(() => {
    if (searchName) {
      const filtered = projects.filter((client) =>
        client.name.toLowerCase().includes(searchName.toLowerCase())
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, [projects, searchName]);

  const handleClick = (id) => {
    setPreview(true);
    setSelected(id);
  };

  useEffect(()=>{
    async function info(){
    try {
      const response = await axios.get(`/api/courses/teamates/${data.name}`)
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  info();

  }, [data])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
    if (searchName) {
      const filtered = projects.filter((client) =>
        client.name.toLowerCase().includes(searchName.toLowerCase())
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  };

  const handleClose = () => {
    setPreview(false);
  };

  return (
    <div>

      {preview && (
        <ProjectPreview projectId={selected} handleClose={handleClose} />
      )}
      {/* table goes here */}
      <StyledPaper>
        <Toolbar sx={{ height: "100px" }}>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              color: "#0097EB",
              fontFamily: "Poppins",
            }}
          >
            Projects in this Course
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchOutlinedIcon sx={{ color: "#9F9F9F" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by Project Name"
              inputProps={{ Poppins: "search" }}
              value={searchName}
              onChange={handleSearchNameChange}
            />
          </Search>

          {/* need to add preferences button */}
          <PreferenceForm course={data} />
          <Box sx={{ ml: 1.5 }}></Box>
        </Toolbar>
        <TableContainer>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow sx={{ height: "30px" }}>
                <HeaderTableCell sx={{ width: "5%", paddingLeft: "25px" }}>
                  S.No
                </HeaderTableCell>
                <HeaderTableCell sx={{ width: "30%" }}>
                  Project Name
                </HeaderTableCell>
                <HeaderTableCell sx={{ width: "30%" }}>Skills</HeaderTableCell>
                <HeaderTableCell sx={{ width: "15%" }}>
                  Administrators
                </HeaderTableCell>
                <HeaderTableCell sx={{ width: "10%", paddingRight: "42px" }}>
                  Created By
                </HeaderTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <HoverTableRow
                      key={row._id}
                      onClick={() => handleClick(row._id)}
                    >
                      <StyledTableCell
                        sx={{ width: "5%", paddingLeft: "25px" }}
                      >
                        {index + 1 + page * rowsPerPage}
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: "30%" }}>
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: "25%" }}>
                        {row.skills}
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: "15%" }}>
                        {row.administrators}
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: "15%" }}>
                        {row.createdBy}
                      </StyledTableCell>
                    </HoverTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ marginRight: "1.5rem" }}
          component="div"
          count={projects.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </StyledPaper>
    </div>
  );
}

export default StudentCoursesPage;
