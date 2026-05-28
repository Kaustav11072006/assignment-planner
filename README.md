📅 Smart Assignment PlannerAn intelligent, full-stack web application designed to help students manage their coursework efficiently. The application automatically calculates priority scores for assignments based on deadlines, estimated effort, and weight, ensuring you always know what to work on next.🚀 Features🔒 Secure Authentication: User registration and login using JWT tokens.🧠 Intelligent Priority Engine: A custom algorithm that dynamically scores and sorts assignments.📊 Dynamic Dashboard: View prioritized tasks, update assignment progress, and track deadlines.🔔 Automated Reminders: Integrated cron scheduling logic to trigger upcoming due-date notifications.📱 Responsive UI: Built with modern React and styled with clean component layouts.🛠️ Tech StackBackendFramework: FastAPI (Python)Database: PostgreSQLORM: SQLAlchemy / SQLModelValidation: PydanticAuthentication: JWT (JSON Web Tokens)FrontendFramework: React (Vite)Routing: React Router DOMState Management: React Context API (Auth Context)HTTP Client: AxiosStyling: Tailwind CSS📁 Repository StructurePlaintextassignment-planner/
├── backend/                  # Python FastAPI Backend
│   ├── app/
│   │   ├── routes/           # API Controllers (Auth, Assignments CRUD)
│   │   ├── services/         # Business Logic (Priority Engine, Scheduler)
│   │   ├── models.py         # Database Tables
│   │   ├── schemas.py        # Pydantic Schemas
│   │   └── main.py           # Entry point
│   └── requirements.txt      # Python dependencies
│
└── frontend/                 # React Frontend
    ├── src/
    │   ├── components/       # Reusable UI elements (Navbar, Cards, Forms)
    │   ├── context/          # Global Auth State
    │   ├── pages/            # Page Views (Dashboard, Login, Register)
    │   └── services/         # Axios configuration (api.js)
    └── package.json          # Frontend dependencies
⚙️ Getting StartedPrerequisitesPython 3.10+Node.js 18+PostgreSQL database instance1. Backend SetupNavigate to the backend directory:Bashcd backend
Create a virtual environment and activate it:Bashpython -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
Install the dependencies:Bashpip install -r requirements.txt
Create a .env file in the backend/ directory:Code snippetDATABASE_URL=postgresql://username:password@localhost:5432/assignment_planner_db
SECRET_KEY=your_super_secret_jwt_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
Run the FastAPI development server:Bashuvicorn app.main:app --reload
The backend API will be available at http://127.0.0.1:8000. You can view the interactive API documentation at http://127.0.0.1:8000/docs.2. Frontend SetupNavigate to the frontend directory:Bashcd ../frontend
Install the node packages:Bashnpm install
Create a .env file in the frontend/ directory:Code snippetVITE_API_BASE_URL=http://127.0.0.1:8000
Start the Vite development server:Bashnpm run dev
The frontend application will typically open at http://localhost:5173.🧠 Priority Engine LogicThe core value of this application lies in backend/app/services/priority_engine.py. Assignments are dynamically scored using the following mathematical formula:$$\text{Priority Score} = \frac{(\text{Weight} \times w_1) + (\text{Effort} \times w_2)}{\text{Time Remaining}} + \text{Urgency Multiplier}$$💡 How it works: Tasks with heavier weight and shorter deadlines float to the top of your dashboard, taking the guesswork out of time management.🤝 ContributingFork the project.Create your feature branch (git checkout -b feature/AmazingFeature).Commit your changes (git commit -m 'Add some AmazingFeature').Push to the branch (git push origin feature/AmazingFeature).Open a Pull Request.📄 LicenseDistributed under the MIT License. See LICENSE for more information.
