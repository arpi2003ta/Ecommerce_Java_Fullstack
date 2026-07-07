import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useLocation, useNavigate } from 'react-router-dom'
import DeliveryAddressForm from './DeliveryAddressForm'
import OrderSummary from './OrderSummary'
import RazorpayCheckout from '../../Payment/RazorpayCheckout'
import { useSelector } from 'react-redux'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const steps = ['Login', 'Delivery Address', 'Order Summary', 'Payment'];

function isStepOptional(step) {
  if (step === 1) return true;
  return false;
}

function isStepSkipped(step) {
  return false;
}

export default function CheckOut() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false)
  const [paymentError, setPaymentError] = React.useState('')
  const [savedAddress, setSavedAddress] = React.useState(null)
  const location = useLocation();
  const navigate = useNavigate();
  const querySearch = new URLSearchParams(location.search);
  const stepParam = Number(querySearch.get("step") || 1)
  const { cart } = useSelector((store) => store)

  React.useEffect(() => {
    if (stepParam >= 1 && stepParam <= steps.length) {
      setActiveStep(stepParam - 1)
    }
  }, [stepParam])

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Final step: trigger payment
      initiatePayment()
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      navigate(`/checkout?step=${activeStep + 2}`)
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    navigate(`/checkout?step=${activeStep}`)
  };

  const initiatePayment = () => {
    const totalAmount = cart.totalPayable || 0
    if (totalAmount <= 0) {
      setPaymentError('Invalid order amount')
      return
    }
    // Trigger Razorpay
    window.__razorpay?.openCheckout()
  }

  const handlePaymentSuccess = (response) => {
    setPaymentSuccess(true)
    setPaymentError('')
    // TODO: send payment_id to backend, create order
    console.log('Payment successful:', response)
  }

  const handlePaymentFailure = (response) => {
    setPaymentError('Payment failed. Please try again.')
  }

  return (
    <div className="px-10 lg:px-20">
      {paymentSuccess ? (
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: 'green' }} />
          <Typography variant="h4" sx={{ mt: 3 }}>Payment Successful!</Typography>
          <Typography sx={{ mt: 2 }}>Your order has been placed successfully. You will be redirected to tracking shortly.</Typography>
          <Button variant="contained" sx={{ mt: 4, bgcolor: '#9155fd' }} onClick={() => navigate('/account/order')}>Track Order</Button>
        </Box>
      ) : (
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = <Typography variant="caption">Optional</Typography>;
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {activeStep < steps.length ? (
            <React.Fragment>
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={activeStep === steps.length - 1 ? 12 : 8}>
                  <Card>
                    <CardContent>
                      <Typography sx={{ mb: 2 }}>Step {activeStep + 1} - {steps[activeStep]}</Typography>
                      {activeStep === 0 && <DeliveryAddressForm onAddressSelect={setSavedAddress} />}
                      {activeStep === 1 && <OrderSummary savedAddress={savedAddress} />}
                      {activeStep === 2 && (
                        <Box>
                          <Typography variant="h6" sx={{ mb: 2 }}>Review Your Order</Typography>
                          <OrderSummary savedAddress={savedAddress} />
                          <Box sx={{ mt: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Delivery Address</Typography>
                            {savedAddress ? (
                              <Typography>{savedAddress.firstname} {savedAddress.lastname}, {savedAddress.streetAddress}, {savedAddress.city}, {savedAddress.state} - {savedAddress.zipCode}</Typography>
                            ) : (
                              <Typography>No address selected. Please go back and add an address.</Typography>
                            )}
                          </Box>
                        </Box>
                      )}
                      {activeStep === 3 && (
                        <Box sx={{ textAlign: 'center', py: 6 }}>
                          <Typography variant="h6" sx={{ mb: 2 }}>Payment</Typography>
                          <Typography sx={{ mb: 3 }}>Click Pay Now to complete your order.</Typography>
                        </Box>
                      )}
                      {paymentError && <Typography color="error" sx={{ mt: 2 }}>{paymentError}</Typography>}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, mt: 2 }}>
                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>Back</Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext} variant="contained" sx={{ bgcolor: '#9155fd' }}>
                  {activeStep === steps.length - 1 ? 'Pay Now' : 'Next'}
                </Button>
              </Box>
              {activeStep === steps.length - 1 && (
                <RazorpayCheckout
                  amount={cart.totalPayable || 0}
                  name="Zosh E-Commerce"
                  description="Order Payment"
                  onSuccess={handlePaymentSuccess}
                  onFailure={handlePaymentFailure}
                />
              )}
            </React.Fragment>
          ) : (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography>Invalid checkout step.</Typography>
            </Box>
          )}
        </Box>
      )}
    </div>
  );
}
