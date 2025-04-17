import React, { useEffect, useMemo, useState } from "react";
import { Container, Row} from "reactstrap";
import withRouter from "../../components/Common/withRouter";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

//Import Cards
import CardProject from "./card-project";
import Spinners from "../../components/Common/Spinner";
import Paginations from "../../components/Common/Pagination";

import { db } from "../../Firebase/firebaseConfig"; // Adjust path if needed
import { collection, getDocs } from "firebase/firestore";


const ProjectsGrid = () => {
  //meta title
  document.title =
    "Projects Grid | Skote - Vite React Admin & Dashboard Template";

    const [projects, setProjects] = useState([]);
    const [isLoading, setLoading] = useState(true);
    
  const [projectsList, setProjectsList] = useState();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projectArray);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProjects();
  }, []);
  


  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const perPageData = 9;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;
  const currentdata = useMemo(() => projects?.slice(indexOfFirst, indexOfLast), [projects, indexOfFirst, indexOfLast])

  useEffect(() => {
    setProjectsList(currentdata);
  }, [currentdata]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projects" breadcrumbItem="Projects Grid" />

          <Row>
            {/* Import Cards */}
            {
              isLoading ? <Spinners setLoading={setLoading} />
                :
                <>
                  <CardProject projects={projectsList} />
                  <Row>
                    <Paginations
                      perPageData={6}
                      data={projects}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      isShowingPageLength={false}
                      paginationDiv="col-12"
                      paginationClass="pagination pagination-rounded justify-content-center mt-2 mb-5" />
                  </Row>
                </>
            }
          </Row>

        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ProjectsGrid);
