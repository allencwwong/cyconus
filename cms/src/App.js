import MultiStepForm from './MultiStepForm';
import './App.css';

function App() {

  return (
    <div className="App">
      {/* <BrowserRouter>
        <Route exact path="/" render={(props) => <Form {...props} initialValues={initialValues} setInitialValues={setInitialValues} />} />
        <Route exact path="/confirmation" render={(props) => <Confirmation {...props} initialValues={initialValues} setInitialValues={setInitialValues} emptyInitVals={emptyInitVals} />} />
      </BrowserRouter> */}
      <MultiStepForm/>
    </div>
  );
}

export default App;


