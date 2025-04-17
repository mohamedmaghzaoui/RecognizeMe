import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  viewSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  viewButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: '#1A3D2F',
  },
  viewText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalView: {
    marginTop: '40%',
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    elevation: 5,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
});
